# Booking Status Audit History and Admin Override API Contract V1

This contract captures marketplace slice 16: admins and support can inspect booking status history, while only admins can manually override eligible booking statuses for ops recovery.

## Status History Rule

Every successful booking status transition must create one immutable status history entry in the same transaction as the booking update.

Status history is the shared audit ledger for:

- Booking creation into `pending_assignment`.
- Admin assignment.
- Partner acceptance or decline.
- Admin confirmation.
- Partner fulfillment updates.
- Admin cancellation.
- Admin status override.

## Status History Entry Shape

```json
{
  "id": "status_history_001",
  "bookingId": "booking_001",
  "previousStatus": "accepted",
  "newStatus": "confirmed",
  "changedBy": "admin_001",
  "changedByRole": "admin",
  "sourceEventType": "booking_confirmation",
  "sourceEventId": "confirmation_001",
  "reason": "Customer confirmed final slot and payment instructions.",
  "internalNotes": "Called customer from ops phone.",
  "createdAt": "2026-05-29T10:00:00.000Z"
}
```

### Fields

- `previousStatus`: nullable only for initial booking creation.
- `newStatus`: one of the ADR 0005 booking statuses.
- `changedBy`: authenticated actor id or system actor id.
- `changedByRole`: `customer`, `partner`, `admin`, `support`, or `system`.
- `sourceEventType`: stable source such as `booking_request`, `assignment`, `partner_response`, `booking_confirmation`, `fulfillment`, `cancellation`, or `status_override`.
- `sourceEventId`: id of the source event when one exists; required for all non-initial transitions in V1.
- `reason`: required for admin overrides and cancellations; optional for normal automated lifecycle transitions.
- `internalNotes`: admin/support-only context. Never return this field to customers or partners.

## Get Booking Status History

`GET /api/v1/admin/bookings/:bookingId/status-history`

Lists immutable status history entries for one booking, oldest first.

### Auth

- Required role: `admin` or `support`
- `customer` and `partner` must receive `403` in V1.

### Response `200`

```json
{
  "data": [
    {
      "id": "status_history_001",
      "bookingId": "booking_001",
      "previousStatus": "accepted",
      "newStatus": "confirmed",
      "changedBy": "admin_001",
      "changedByRole": "admin",
      "sourceEventType": "booking_confirmation",
      "sourceEventId": "confirmation_001",
      "reason": "Customer confirmed final slot and payment instructions.",
      "internalNotes": "Called customer from ops phone.",
      "createdAt": "2026-05-29T10:00:00.000Z"
    }
  ]
}
```

## Admin Override Booking Status

`POST /api/v1/admin/bookings/:bookingId/status-override`

Manually moves a booking to an allowed status when ops needs to resolve a support case without engineering help.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

### Request Body

```json
{
  "newStatus": "confirmed",
  "reason": "Partner accepted by phone; admin confirmed after customer support call.",
  "internalNotes": "Used after partner app outage. See support ticket SUP-102."
}
```

### Validation

- Booking must exist.
- `newStatus` must be one of the ADR 0005 booking statuses.
- `reason` is required.
- Override cannot keep the booking in the same status.
- Override cannot move a `completed` booking to any other status.
- Override cannot move a `cancelled` booking to any other status.
- Override cannot move any booking to `draft`.
- Override cannot bypass cancellation/refund rules; use the cancellation contract to move a booking to `cancelled`.
- Admin should only override to `pending_assignment`, `assigned`, `accepted`, `confirmed`, `in_progress`, or `completed` when the operational facts already support that state.
- Override notification routing is defined by `docs/api/booking-status-notification-hooks-v1.md`. Exact matches to standard transitions use the standard recipient/template mapping; other override transitions emit only an admin-visible `admin_booking_status_overridden` event in V1.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "previousStatus": "accepted",
    "status": "confirmed",
    "updatedAt": "2026-05-29T10:05:00.000Z"
  },
  "event": {
    "id": "status_override_001",
    "bookingId": "booking_001",
    "overriddenBy": "admin_001",
    "previousStatus": "accepted",
    "newStatus": "confirmed",
    "reason": "Partner accepted by phone; admin confirmed after customer support call.",
    "internalNotes": "Used after partner app outage. See support ticket SUP-102.",
    "createdAt": "2026-05-29T10:05:00.000Z"
  },
  "statusHistory": {
    "id": "status_history_002",
    "bookingId": "booking_001",
    "previousStatus": "accepted",
    "newStatus": "confirmed",
    "sourceEventType": "status_override",
    "sourceEventId": "status_override_001",
    "createdAt": "2026-05-29T10:05:00.000Z"
  }
}
```

## Privacy Rules

Status history and override events are admin/support operational records.

Customer and partner booking responses may expose the current booking status only. They must not include:

- Override reason.
- Internal override notes.
- Actor ids for admin/support users.
- Support ticket references.
- Internal status history entries.

## Notes For Backend Slice

- Normal lifecycle contracts should call the same status history writer used by overrides.
- Admin override, status history creation, and notification event creation should be transactional.
- Override notification events should use `sourceEventType: status_override` and the status override event id as `sourceEventId`.
- Overrides that do not match a standard notification transition should still create one admin-visible notification event with `templateKey: admin_booking_status_overridden`.
- Notification delivery failures must not roll back the override after the notification event row is created.
- Assignment history remains separate from status history; status history records the status transition, while assignment history records partner assignment facts.

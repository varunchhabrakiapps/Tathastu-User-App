# Booking Status Notification Hooks API Contract V1

This contract captures marketplace slice 12: booking status changes create durable notification events that can be handled by ops, SMS, or email without requiring paid WhatsApp API automation.

## Event Creation Rule

Every successful booking status transition must create notification events in the same transaction as the booking update and the domain event that caused it.

V1 emits events for these transitions:

| Transition | Recipients | Template key |
| --- | --- | --- |
| `pending_assignment` -> `assigned` | assigned partner | `partner_booking_assigned` |
| `assigned` -> `accepted` | admin | `admin_partner_accepted_booking` |
| `assigned` -> `pending_assignment` | admin | `admin_partner_declined_booking` |
| `accepted` -> `confirmed` | customer, assigned partner | `customer_booking_confirmed`, `partner_booking_confirmed` |
| `confirmed` -> `in_progress` | customer, admin | `customer_booking_in_progress`, `admin_booking_in_progress` |
| `in_progress` -> `completed` | customer, admin | `customer_booking_completed`, `admin_booking_completed` |
| Any allowed status -> `cancelled` | customer, assigned partner when present, admin | `booking_cancelled` |
| Admin override transition not otherwise listed above | admin | `admin_booking_status_overridden` |

Notification event creation must be idempotent by `bookingId`, source event id, recipient role/user, and template key. Replaying a status transition handler must not create duplicate notification rows.

## Source Linkage Rules

Notification events must keep a durable link back to the domain event that caused the status transition.

### Cancellation Linkage

Admin cancellation is a status transition to `cancelled`. The cancellation flow must create notification events in the same transaction as the booking update, cancellation event, status history entry, cancellation request resolution, and optional refund tracking record.

Cancellation notifications must use:

- `sourceEventType: cancellation`
- `sourceEventId`: the cancellation event id, for example `cancellation_event_001`
- `previousStatus`: the status before cancellation
- `newStatus: cancelled`
- `templateKey: booking_cancelled`

Cancellation-request creation does not change booking status and must not create `booking.status.changed` notifications by itself.

### Admin Override Linkage

Admin status override is a status transition caused by a `status_override` event. The override flow must create notification events in the same transaction as the booking update, status override event, and status history entry.

Override notifications must use:

- `sourceEventType: status_override`
- `sourceEventId`: the status override event id, for example `status_override_001`
- `previousStatus`: the status before override
- `newStatus`: the admin-selected status after override

When an override exactly matches one of the standard transitions above, it uses that transition's recipients and template keys with the override source linkage. When an override does not match a listed transition, V1 emits only an admin-visible `admin_booking_status_overridden` event so ops can decide whether a manual customer or partner follow-up is appropriate.

Overrides cannot move a booking to `cancelled`; cancellation/refund flows own cancellation notifications.

## Notification Event Shape

```json
{
  "id": "notification_001",
  "eventType": "booking.status.changed",
  "bookingId": "booking_001",
  "sourceEventType": "booking_confirmation",
  "sourceEventId": "confirmation_001",
  "previousStatus": "accepted",
  "newStatus": "confirmed",
  "recipientRole": "customer",
  "recipientUserId": "customer_123",
  "recipientContact": {
    "phone": "9876543210",
    "email": "customer@example.com"
  },
  "templateKey": "customer_booking_confirmed",
  "channel": "admin_visible",
  "deliveryStatus": "pending",
  "messageVariables": {
    "ritualName": "Grah Pravesh Puja",
    "preferredSlot": "2026-06-02T09:30:00.000+05:30",
    "mode": "home_visit"
  },
  "createdAt": "2026-05-28T10:00:00.000Z",
  "updatedAt": "2026-05-28T10:00:00.000Z"
}
```

### Fields

- `eventType`: always `booking.status.changed` in V1.
- `sourceEventType`: the domain event that created the status change, such as `assignment`, `partner_response`, `booking_confirmation`, `fulfillment`, `cancellation`, or `status_override`.
- `sourceEventId`: id of the assignment, response, confirmation, fulfillment, cancellation, status override, or other domain event that caused the status change.
- `recipientRole`: `customer`, `partner`, or `admin`.
- `recipientUserId`: user id when the recipient is a specific customer or partner; nullable for admin ops queues.
- `recipientContact`: channel-specific contact data available at event creation time.
- `templateKey`: stable key used by manual ops, SMS, or email renderers.
- `channel`: one of `admin_visible`, `manual_sms`, `manual_email`, `sms`, or `email`.
- `deliveryStatus`: one of `pending`, `manual_action_required`, `sent`, `skipped`, or `failed`.
- `messageVariables`: sanitized values allowed for the recipient and template.

## Admin Notification Queue

`GET /api/v1/admin/booking-notifications`

Lists notification events for ops review and manual follow-up, newest first.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

### Query Parameters

- `deliveryStatus`: optional filter, for example `pending` or `manual_action_required`.
- `bookingId`: optional booking filter.
- `recipientRole`: optional filter.

### Response `200`

```json
{
  "data": [
    {
      "id": "notification_001",
      "eventType": "booking.status.changed",
      "bookingId": "booking_001",
      "previousStatus": "accepted",
      "newStatus": "confirmed",
      "recipientRole": "customer",
      "recipientUserId": "customer_123",
      "templateKey": "customer_booking_confirmed",
      "channel": "admin_visible",
      "deliveryStatus": "pending",
      "messageVariables": {
        "ritualName": "Grah Pravesh Puja",
        "preferredSlot": "2026-06-02T09:30:00.000+05:30",
        "mode": "home_visit"
      },
      "createdAt": "2026-05-28T10:00:00.000Z"
    }
  ]
}
```

## Mark Notification Handled

`POST /api/v1/admin/booking-notifications/:notificationId/handled`

Marks an admin-visible or manual notification as handled after ops sends a manual message or decides no customer-facing message is needed.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

### Request Body

```json
{
  "deliveryStatus": "sent",
  "channel": "manual_sms",
  "handledNotes": "Sent confirmation SMS from ops phone."
}
```

### Validation

- Notification must exist.
- `deliveryStatus` must be `sent`, `skipped`, or `failed`.
- `handledNotes` are internal-only and must never appear in customer or partner booking responses.

### Response `200`

```json
{
  "notification": {
    "id": "notification_001",
    "bookingId": "booking_001",
    "channel": "manual_sms",
    "deliveryStatus": "sent",
    "handledBy": "admin_001",
    "handledAt": "2026-05-28T10:05:00.000Z"
  }
}
```

## Privacy Rules

Notification events must not expose private data beyond what the recipient is allowed to know at that booking status.

Customer and partner notifications must not include:

- Internal assignment notes.
- Internal confirmation notes.
- Partner reliability/admin notes.
- Support-only annotations.
- Payment state unless a payment-specific notification contract adds it later.

Partner assignment notifications before acceptance must follow the pre-acceptance visibility rules from ADR 0005 and avoid full customer name, phone, and exact address.

## Notes For Backend Slice

- Start with `admin_visible` events so ops can manually send WhatsApp, SMS, or email messages.
- `sms` and `email` channels can be connected later by adapters reading the same event shape.
- Paid WhatsApp Business API integration is explicitly out of scope for V1.
- Event creation should be called by existing assignment, partner response, confirmation, fulfillment, cancellation, and status override flows.
- Notification delivery failures must not roll back a completed booking status transition; only notification event creation is part of the status-change transaction.

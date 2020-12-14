# Parking Lot Problem

## Scenario

- While parking:
  - The user will register using adhar card and vehicle
  - Manager will assign an active Parking Lot
  - User will be assigned the nearest slot of a Parking Lot
  - User will receive a token
  - Token has details for parking
  - Slot of the parking lot will be marked as BOOKED

- While un-parking:
  - User will provide token
  - Vehicle will be located using a token
  - On locating the vehicle, fees will be calculated
  - Slot will be marked FREE
  - Cases:
    - Cannot unpark if the slot is not active

#### Manager

- Can create multiple parking lots with the given size
- Can mark any Parking Lot as Active/Maintainance
- Can view the status of a parking lot using Parking Lot id

### Improvements

#### Parking Lot

- Parking Lot can have multiple blocks
- The Blocks inside the parking lot can have multiple floors
- Floors inside blocks can have slots

#### Users

- Can have multiple vehicles
- Vehicles can be of multiple types
- Vehicles can have different slot requirements

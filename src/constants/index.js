export const PARKING_SLOT_STATUS = {
	BOOKED: 'booked',
	FREE: 'free'
}

export const PARKING_LOT_STATUS = {
	ACTIVE: 'active',
	MAINTAINANCE: 'maintainance',
	INACTIVE: 'inactive'
}

export const CURRENT_PARKING_STATUS = {
	PARKED: 'parked',
	UNPARKED: 'unparked'
}

export const PARKING_FEES = Number(process.env.PAY_PER_HOUR) || 10;
import { io } from "socket.io-client"
import globalConstants from '../config/globalConstants'

let socket
export let isConnect = false

export const StopConnection = () => {
	if (!isConnect)
		return

	socket.off('message')
	socket.off('connect')
	socket.off('disconnect')
}

export const SendStartMonitoring = (message) => {
	if (!isConnect)
		return
	
	console.log("SendStartMonitoring", socket)
	socket.emit('startMonitoring', message)
}

export const SendManageMonitoring = (message) => {
	if (!isConnect)
		return
	
	console.log("SendManageMonitoring", socket)
	socket.emit('manageMonitoring', message)
}

export const StartConnection = (userLaunchParams, SetStartMonitoring, SetManageMonitoring, SetNotification, SetError, SetUnknown) => {
	if (isConnect)
		return

	socket = io(`${globalConstants.ws}`, {
		query: userLaunchParams
	})

	socket.on('message', (response) => {
		const { event, data } = response;
	
		if (event === 'startMonitoring')
			SetStartMonitoring(data)
		
		else if (event === 'manageMonitoring')
			SetManageMonitoring(data)

		else if (event === 'notification')
			SetNotification(data)

		else if (event === 'error')
			SetError(data)

		else
			SetUnknown(event, data)
	})
	
	socket.on("connect", () => {
		isConnect = true
		console.log("Connect")
	});
	
	socket.on("disconnect", () => {
		isConnect = false
		console.log("Disconnect")
	});
}
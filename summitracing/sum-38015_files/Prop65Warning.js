$("a.modalHazmatInfo").overlay({
	// some expose tweaks suitable for modal dialogs 
	close: '.layer-close',
	expose: {
		color: '#333',
		loadSpeed: 200,
		opacity: 0.3
	},
	target: '#hazardous-material-warning',
	closeOnClick: true
});
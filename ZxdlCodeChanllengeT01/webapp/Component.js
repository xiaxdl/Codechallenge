sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/customer/codeChanllenge/t01/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/f/library",
	"sap/ui/core/format/DateFormat"
], function(UIComponent, Device, models, JSONModel, Filter, FilterOperator, Sorter, fioriLibrary, DateFormat) {
	"use strict";

	return UIComponent.extend("sap.customer.codeChanllenge.t01.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			this.initJsonModel();

			var oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMached, this);
			oRouter.initialize();
		},
		_onBeforeRouteMached: function(oEvent) {
			var oModel = this.getModel();
			var sLayout = oEvent.getParameters().arguments.layout;
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}
			oModel.setProperty("/layout", sLayout);
		},
		initJsonModel: function() {

			var oHisRecords = [];
			var oChatList = [];

			var oChatModel = new JSONModel();
			oChatModel.loadData("mockData/chatsSet.json", "", false);
			var oChatData = oChatModel.getData();

			var oReceiveMsgModel = new JSONModel();
			oReceiveMsgModel.loadData("mockData/ReceivedMessagesSet.json", "", false);
			var oReceivedMsgData = oReceiveMsgModel.getData();

			var oSentMsgModel = new JSONModel();
			oSentMsgModel.loadData("mockData/SentMessagesSet.json", "", false);
			var oSentMsgData = oSentMsgModel.getData();

			oReceivedMsgData.forEach(function(cReceiveMsg) {
				var oHisRecord = {
					phone: "",
					photo: "",
					id: "",
					date: "",
					text: "",
					sent: "",
					read: "",
					delivered: "",
					type: ""
				};
				oHisRecord.phone = cReceiveMsg.phone;
				oHisRecord.id = cReceiveMsg.id;
				oHisRecord.date = cReceiveMsg.date;
				oHisRecord.text = cReceiveMsg.text;
				oHisRecord.type = "R";
				oHisRecords.push(oHisRecord);
			});
			oSentMsgData.forEach(function(cSentMsg) {
				var oHisRecord = {
					phone: "",
					photo: "",
					id: "",
					date: "",
					text: "",
					sent: "",
					read: "",
					delivered: "",
					type: ""
				};
				oHisRecord.phone = cSentMsg.phone;
				oHisRecord.id = cSentMsg.id;
				oHisRecord.date = cSentMsg.date;
				oHisRecord.text = cSentMsg.text;
				oHisRecord.sent = cSentMsg.sent;
				oHisRecord.read = cSentMsg.read;
				oHisRecord.delivered = cSentMsg.delivered;
				oHisRecord.type = "S";
				oHisRecords.push(oHisRecord);
			});
			//Sort by phone
			oHisRecords.sort(function(a, b) {
				if (a.phone == b.phone) {
					return -1;
				} else {
					return 1;
				}
			});
			//Sort by Date ascending
			// oHisRecords.sort(function(a, b) {
			// 	if (a.phone == b.phone) {
			// 		var startDate = Date.parse(new Date(Date.UTC(a.date.split("T")[0].split("/")[2], a.date.split("T")[0].split("/")[1], a.date.split(
			// 			"T")[0].split("/")[0], a.date.split("T")[1].split(":")[0] - 8, a.date.split("T")[1].split(":")[1])));
			// 		var endDate = Date.parse(new Date(Date.UTC(b.date.split("T")[0].split("/")[2], b.date.split("T")[0].split("/")[1], b.date.split(
			// 			"T")[0].split("/")[0], b.date.split("T")[1].split(":")[0] - 8, b.date.split("T")[1].split(":")[1])));
			// 		// var dateFormat = DateFormat.getDateInstance({
			// 		// 	pattern: "dd/MM/yyyy HH:ss"
			// 		// });
			// 		// var dateformat = dateFormat.parse(a.date);
			// 		// var date1 = dateFormat.format(dateformat);
			// 		if (startDate <= endDate) {
			// 			return -1;
			// 		} else {
			// 			return 1;
			// 		}
			// 	}
			// });
			//Sort by Date descending
			oHisRecords.sort(function(a, b) {
				if (a.phone == b.phone) {
					var startDate = Date.parse(new Date(Date.UTC(a.date.split("T")[0].split("/")[2], a.date.split("T")[0].split("/")[1], a.date.split(
						"T")[0].split("/")[0], a.date.split("T")[1].split(":")[0] - 8, a.date.split("T")[1].split(":")[1])));
					var endDate = Date.parse(new Date(Date.UTC(b.date.split("T")[0].split("/")[2], b.date.split("T")[0].split("/")[1], b.date.split(
						"T")[0].split("/")[0], b.date.split("T")[1].split(":")[0] - 8, b.date.split("T")[1].split(":")[1])));
					// var dateFormat = DateFormat.getDateInstance({
					// 	pattern: "dd/MM/yyyy HH:ss"
					// });
					// var dateformat = dateFormat.parse(a.date);
					// var date1 = dateFormat.format(dateformat);
					if (startDate <= endDate) {
						return 1;
					} else {
						return -1;
					}
				}
			});
			for (var i = 0; i < oChatData.length; i++) {
				var currentReceiveMsgData = oReceivedMsgData.filter(oReceivedMsg => oReceivedMsg.phone == oChatData[i].phone);
				var currentSentMsgData = oSentMsgData.filter(oSentMsg => oSentMsg.phone == oChatData[i].phone);
				var oChat = {
					phone: "",
					contactName: "",
					photo: "",
					date: "",
					recentMsg: ""
				};
				oChat.phone = oChatData[i].phone;
				oChat.contactName = oChatData[i].contactName;
				oChat.photo = oChatData[i].photo;
				if (oHisRecords.filter(oDescData => oDescData.phone == oChatData[i].phone).length > 0) {
					oChat.date = oHisRecords.filter(oDescData => oDescData.phone == oChatData[i].phone)[0].date;
					if(oHisRecords.filter(oDescData => oDescData.phone == oChatData[i].phone)[0].type == 'S'){
						oChat.recentMsg = "You: " + oHisRecords.filter(oDescData => oDescData.phone == oChatData[i].phone)[0].text;
					} else {
						oChat.recentMsg = oHisRecords.filter(oDescData => oDescData.phone == oChatData[i].phone)[0].text;
					}
					
				}
				oChatList.push(oChat);
			}

			var oChatModel = new JSONModel(oChatList);
			this.setModel(oChatModel, "chats");

			var oHisMsgModel = new JSONModel(oHisRecords);
			this.setModel(oHisMsgModel, "historyList");

			var oModel = new JSONModel();
			this.setModel(oModel);
		}
	});
});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.customer.codeChanllenge.t01.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.customer.codeChanllenge.t01.view.Detail
		 */
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oModel = this.getOwnerComponent().getModel();
			this.oRouter.getRoute("master").attachPatternMatched(this._onPhoneMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onPhoneMatched, this);

			this.getView().setModel(
				new JSONModel({
					grid: [{
						image: "images/jane.jpg",
						hyperlink: "https://www.sap.com/community.html"
					}, {
						image: "images/john.jpg",
						hyperlink: "http://www.google.be"
					}, {
						image: "images/joseph.jpg",
						hyperlink: "http://www.twitter.com"
					}]
				}), "chatHisList");
		},
		_onPhoneMatched: function(oEvent) {
			this._sIndex = oEvent.getParameter("arguments").sIndex || this._sIndex || "0";
			this.getView().bindElement({
				path: "chats>/" + this._sIndex
			});
			this._getChatHis(this._sIndex);
		},
		_getChatHis: function(sIndex) {
			var oChatPerson = this.getView().getModel("chats").getData()[sIndex];
			var historyData = this.getView().getModel("historyList").getData().filter(oHistory => oHistory.phone == oChatPerson.phone);
			for (var i = 0; i < historyData.length; i++) {
				if (historyData[i].type === 'S') {
					historyData[i].photo = "images/logo.png";
				} else {
					historyData[i].photo = oChatPerson.photo;
				}
			}
			var oHistoryChatModel = new JSONModel(historyData);
			this.getView().setModel(oHistoryChatModel, "chatHisList")
			this._scrollToBottom();

		},
		_scrollToBottom: function() {
			var oList = this.getView().byId("cChatHis");
			var maxLength = this.getView().getModel("chatHisList").getData().length - 1;
			var oItem = oList.getItems()[maxLength];
			var oScroll = this.getView().byId("oScroll");
			var that = this;
			oScroll.scrollTo(0, oScroll.$().height());
			jQuery.sap.delayedCall(100, that, function() {
				oScroll.scrollTo(0, oScroll.$().height());
			})
		},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.customer.codeChanllenge.t01.view.Detail
		 */
		onExit: function() {
			this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		},
		onSubmitMsg: function(oEvent) {
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
			oHisRecord.phone = this.getView().getModel("chats").getData()[this._sIndex].phone;;
			oHisRecord.id = "232423";
			oHisRecord.photo = "images/logo.png";
			oHisRecord.date = "";
			oHisRecord.text = oEvent.getParameters().value;
			oHisRecord.sent = true;
			oHisRecord.read = false;
			oHisRecord.delivered = true;
			oHisRecord.type = "S";
			this.getView().getModel("historyList").getData().push(oHisRecord);
			this.getView().getModel("chatHisList").getData().push(oHisRecord);

			this.getView().getModel("chats").getData()[this._sIndex].recentMsg = oEvent.getParameters().value;
			sap.ui.getCore().byId("__xmlview1").oController.refreshChatList();
			// sap.ui.getCore().byId("__xmlview1").byId("chatList").getBinding("items").refresh(true);
			this.getView().byId("cChatHis").getBinding("items").refresh(true);
			this.getView().byId("sendMsgInput").setValue("");
			this._scrollToBottom();
		}

	});

});
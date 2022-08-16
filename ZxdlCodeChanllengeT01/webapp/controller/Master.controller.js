sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/f/library"
], function(Controller, JSONModel, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return Controller.extend("sap.customer.codeChanllenge.t01.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.customer.codeChanllenge.t01.view.Master
		 */
		onInit: function() {
			this.oView = this.getView();
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oList = this.getView().byId("chatList");
		},
		onMasterItemPress: function(oEvent) {
			var sIndex = oEvent.getSource().getParent().indexOfItem(oEvent.getSource());
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

			this.oRouter.navTo("detail", {
				layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
				sIndex: sIndex
			});
		},
		onSearch: function(oEvent) {
			var oTablseSearchState = [],
				sQuery = oEvent.getParameter("query");


			if (sQuery && sQuery.length > 0) {
				var historyData = this.getView().getModel("historyList").getData().filter(oHistory => oHistory.text.includes(sQuery));
				var chatList = this.getView().getModel("chats").getData().filter(oHistory => oHistory.contactName.includes(sQuery));
				for(var i = 0; i < historyData.length; i++){
					oTablseSearchState.push(new Filter("phone", FilterOperator.EQ, historyData[i].phone))
				}
				for(var j = 0; j < chatList.length; j++){
					oTablseSearchState.push(new Filter("phone", FilterOperator.EQ, chatList[j].phone))
				}
			}
			this.oList.getBinding("items").filter(oTablseSearchState, "Application");
		},
		refreshChatList: function(){
			this.getView().byId("chatList").getBinding("items").refresh(true);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.customer.codeChanllenge.t01.view.Master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.customer.codeChanllenge.t01.view.Master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.customer.codeChanllenge.t01.view.Master
		 */
		//	onExit: function() {
		//
		//	}

	});

});
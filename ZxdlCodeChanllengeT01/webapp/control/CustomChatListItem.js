sap.ui.define(["sap/ui/core/Control"], function(Control) {
	"use strict";
	return Control.extend("sap.customer.codeChanllenge.t01.control.CustomChatListItem", {
		"metadata": {
			"properties": {
				"type": "string",
				"src": "string",
				"text": "string"
			},
			"events": {}
		},
		init: function() {},
		renderer: function(oRm, oControl) {
			oRm.write("<li");
			oRm.writeAttributeEscaped("role", "option");
			oRm.writeAttributeEscaped("class",
				"sapMLIBShowSeparator sapMLIBShowSeparator sapMLIBActionable sapMLIBHoverable sapMLIBFocusable sapMSLI sapMSLIThumbnail sapMSLIWithDescription sapMSLIWrapping"
			);
			oRm.write(" style=\"display: flex;\"");
			oRm.write(">");
			if (oControl.getType() === 'S') {
				oRm.write("<div class=\"sapMSLIDiv\"");
				oRm.write(
					" style=\"text-align: center; -webkit-box-align: center; align-items: center; position: relative; justify-content: flex-end;\"");
				oRm.write(">");
				oRm.write("<div");
				oRm.write(">");
				oRm.write("<span");
				oRm.writeAttributeEscaped("aria-live", "polite");
				oRm.write(">");
				oRm.write(oControl.getText());
				oRm.write("</span>");
				oRm.write("</div>");
				oRm.write("<div");
				oRm.write(">");
				oRm.write("<img");
				oRm.writeAttributeEscaped("src", oControl.getSrc());
				oRm.writeAttributeEscaped("role", "presentation");
				oRm.writeAttributeEscaped("aria-hidden", "true");
				oRm.writeAttributeEscaped("alt", "");
				oRm.writeAttributeEscaped("class", "sapMImg sapMSLIImg");
				oRm.write(" />");
				oRm.write("</div>");
				oRm.write("</div>");
			} else {
				oRm.write("<div class=\"sapMSLIDiv\"");
				oRm.write(
					" style=\"text-align: center; -webkit-box-align: center; align-items: center; position: relative;\"");
				oRm.write(">");
				oRm.write("<div");
				oRm.write(">");
				oRm.write("<img");
				oRm.writeAttributeEscaped("src", oControl.getSrc());
				oRm.writeAttributeEscaped("role", "presentation");
				oRm.writeAttributeEscaped("aria-hidden", "true");
				oRm.writeAttributeEscaped("alt", "");
				oRm.writeAttributeEscaped("class", "sapMImg sapMSLIImg");
				oRm.write(" />");
				oRm.write("</div>");
				oRm.write("<div");
				oRm.write(">");
				oRm.write("<span");
				oRm.writeAttributeEscaped("aria-live", "polite");
				oRm.write(">");
				oRm.write(oControl.getText());
				oRm.write("</span>");
				oRm.write("</div>");
				oRm.write("</div>");
			}
			oRm.write("</li>");
		},
		onAfterRendering: function(evt) {},
		setType: function(value) {
			this.setProperty("type", value, true);
			return this;
		},
		setSrc: function(value) {
			this.setProperty("src", value, true);
			return this;
		},
		setText: function(value) {
			this.setProperty("text", value, true);
			return this;
		}
	});
});
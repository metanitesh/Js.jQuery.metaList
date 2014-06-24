define(["util", "jquery"], function(util, $) {

	Controller = util.defClass({

		constructor: function(el, template) {
				
			this.view = $(el);
			if (template) this.template = $(template).html();
			this.refreshElement();
			this.delegateEvent();
			this.delegateCustomEvent();
		},

		proxy: function(func) {
			return $.proxy(func, this);
		},


		$: function(selector) {
			return $(selector, this.view);
		},

		_isEnterKey: function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			return (code === 13);
		},

		refreshElement: function() {
			for (var element in this.elements) {
				if (this.elements.hasOwnProperty(element)) {
					this.view[element] = this.$(this.elements[element]);

				}
			}
		},

		delegateEvent: function() {
			for (var prop in this.events) {

				if (this.events.hasOwnProperty(prop)) {
					var methodName = this.events[prop];
					var method = this.proxy(this[methodName]);

					var userEvent = prop.split(" ")[0];
					var selector = prop.split(" ")[1];

					var element;

					if (selector) {
						element = this.elements[selector];
						this.view.on(userEvent, element, method);
					} else {
						this.view.on(userEvent, method);
					}
				}


			}
		},

		delegateCustomEvent: function() {
			for (var customEvent in this.customEvents) {

				if(this.customEvents.hasOwnProperty(customEvent)){
					var methodName = this.customEvents[customEvent];
					var method = this.proxy(this[methodName]);
					$(document).on(customEvent, method);
				}
				

			}
		}
	});

	return Controller;
});
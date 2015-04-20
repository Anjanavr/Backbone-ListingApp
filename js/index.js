$(function () {
	var Customer = Backbone.Model.extend({
	    defaults: {
	        name: "",
	        type: "Regular"
	    }
	});

	var Customers = Backbone.Collection.extend({ 
	    model: Customer
	});

	var CustomerView = Backbone.View.extend({    
	    el: "#customer",
	    template: _.template($("#customer-template").html()),   
	    render: function () {
	        this.$el.html(this.template(this.model.toJSON()));
	        return this;
	    }
	});
	var CustomersView = Backbone.View.extend({    
	    el: "#customers",
	    template: _.template($("#customers-template").html()),
	    events: {
			"click li": "changeModel"
	 	},    
	    render: function () {
	        this.model.each(this.addOne, this);       
	        return this;
	    },
	    addOne: function(car) {
	        this.$el.append(this.template(car.toJSON()));
	    },
	    changeModel: function(e) {        
	        var customersArr = this.model.where({ "name": e.currentTarget.innerText });
	        var customerView = new CustomerView({ model:  customersArr[0] });
	        customerView.render();
	    }
	});

	var dave = new Customer({
	    name: "Dave"
	});
	var jane = new Customer({
	    name: "Jane",
	    type: "Platinum"
	});
	var customers = new Customers([dave, jane]);
	var customersView = new CustomersView({model: customers});
	customersView.render();
});
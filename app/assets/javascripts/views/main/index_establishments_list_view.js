MainIndexEstablishmentsListView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex'
	},

	initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
	},

	render: function (e) {
		this.$el.html('');

		if (this.collection.length > 0) {
	    	this.collection.each(function (establishment) {
				this.renderEstablishment(establishment);
			}, this);			
		} else {
			this.$el.html('');
	        this.$el.html(render('establishments/index_no_results'));
		}	
	},

	renderEstablishment: function (establishment) {
		var establishment_view = new EstablishmentsIndexEstablishmentView({
			tagName: 'li',
			model: establishment
		});

		this.$el.append(establishment_view.el);
	},

	goToSubIndex: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});

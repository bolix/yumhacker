UsersShowFollowingContainerView = Backbone.View.extend({
    events: {
        'click a.tab': 'goToSection'
    },

    initialize: function (options) {
        this.listenTo(this.model, 'sync', this.render);

        if (options.section === 'following') {
            this.listenTo(this.model, 'sync', this.renderFollowedUsers);                
        } else if (options.section === 'followers') {
            this.listenTo(this.model, 'sync', this.renderFollowers);
        } else {
            this.listenTo(this.model, 'sync', this.renderEndorsements);                
        }
        
    },

    render: function () {
        this.$el.html(render('users/show_following_container', this.model));
    },

    renderEndorsements: function (e) {
        this.endorsementsIndexListContainerView = new EndorsementsIndexListContainerView({
            el: '.following_list_container',
            model: this.model
        });     
        
        $('#endorsements_tab').addClass('current_tab');
        this.changeHeadInfo('endorsements');
    },

    renderFollowedUsers: function (e) {
        this.followedUsersIndexListContainerView = new FollowedUsersIndexListContainerView({
            el: '.following_list_container',
            model: this.model
        });        

        $('#followed_users_tab').addClass('current_tab');
        this.changeHeadInfo('following');
    },

    renderFollowers: function (e) {
        this.followersIndexListContainerView = new FollowersIndexListContainerView({
            el: '.following_list_container',
            model: this.model
        });

        $('#followers_tab').addClass('current_tab');
        this.changeHeadInfo('followers');
    },

    goToSection: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    },

    changeHeadInfo: function (section) {
        var user_name = this.model.get('full_name');
        var user_location = this.model.get('location') ? ' from ' + this.model.get('location') : '';
        var section_text

        if (section === 'following') {
            section_text = this.model.get('num_followed_users') !== 1 ? ' is following ' + this.model.get('num_followed_users') + ' people' : ' is following 1 person';
        } else if (section === 'followers') {
            section_text = this.model.get('num_followers') !== 1 ? ' has ' + this.model.get('num_followers') + ' followers' : ' has 1 follower';
        } else {
            section_text = this.model.get('num_endorsements') !== 1 ? ' is endorsing ' + this.model.get('num_endorsements') + ' restaurants' : ' is endorsing 1 restaurant';            
        }

        this.title = user_name + ' | ' + capitalize(section) + ' | YumHacker';

        this.description = user_name + user_location + section_text + ' on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});

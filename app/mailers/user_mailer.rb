class UserMailer < ActionMailer::Base
  default from: 'YumHacker <jen@yumhacker.com>'

  def new_followers(user)
    @user = user

    subject = if @user.followers.length > 1
      "You have #{@user.followers.length} new followers on YumHacker"
    else
      'You have a new follower on YumHacker'
    end
    mail(to: "#{@user.first_name} #{@user.last_name} <#{@user.email}>", subject: subject)
  end

end

class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  # POST /signup
  # return authenticated token upon signup

  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.username, user.password).call
    response = { message: Message.account_created, auth_token: auth_token[0], name: auth_token[1], username: auth_token[2] }
    json_response(response, :created)
  end

  private

  def user_params
    params.permit(
        :name,
        :username,
        :password,
        :password_confirmation
    )
  end
end
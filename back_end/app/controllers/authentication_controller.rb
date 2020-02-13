class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate
  # return auth token once user is authenticated
  def authenticate
    auth_token =
        AuthenticateUser.new(auth_params[:username], auth_params[:password]).call
    json_response(auth_token: auth_token[0], name: auth_token[1], username: auth_token[2], id: auth_token[3])
  end

  private

  def auth_params
    params.permit(:username, :password)
  end
end
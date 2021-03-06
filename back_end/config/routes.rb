Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'

  post 'products', to: 'products#create'
  get 'products/user/:user_id', to: 'products#index'
  get 'products/:asin', to: 'products#show'

  post 'analytics', to: 'analytics#create'
  get 'analytics', to: 'analytics#index'
  get 'analytics/:asin', to: 'analytics#show'

  post 'buybox', to: 'buy_boxes#create'
  get 'buybox', to: 'buy_boxes#index'
  get 'buybox/:asin', to: 'buy_boxes#show'
end

class UsersController < ApplicationController
  before_filter :require_user, :only => [:show, :places, :my_places, :account]
  before_filter :require_location, :only => [:my_places]
  
  # Please change this is you can think of a better way to do this. 
  #  we need these actions so we can link to them before we have a current user
  def my_places
    @places = current_user.saved_places.all :select => 'places.*', :order => 'visits.updated_at', :origin => origin
    
    render_standard :data => @places, :action => 'my_places.html'
  end
  
    
  def get_location
    current_navigation :explore
    render_standard :action => 'get_location.html'
  end
  
  def update_location
    if params[:location]
      session[:location] = set_location(params[:location][:latitude], params[:location][:longitude])
    else
      set_location_automatically
    end
    
    logger.info "set location to: #{session[:location].inspect}"
    
    redirect_back_or_default(explore_path)
  end
end

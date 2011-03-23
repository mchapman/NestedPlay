class PeopleController < ApplicationController

  # GET /people
  # GET /people.xml
  def index
    @people = Person.all
  end

  # GET /people/1
  # GET /people/1.xml
  def show
    @person = Person.find(params[:id])
  end

  # GET /people/new
  # GET /people/new.xml
  def new
    @person = Person.new
  end

  # GET /people/1/edit
  def edit
    @person = Person.find(params[:id])
  end

  # POST /people
  # POST /people.xml
  def create
    @person = Person.new(params[:person])
    if @person.save
      redirect_to(@person, :notice => 'Person was successfully created.')
    else
      render :action => "new"
    end
  end

  # PUT /people/1
  # PUT /people/1.xml
  def update
    @person = Person.find(params[:id])
    if @person.update_attributes(params[:person])
      redirect_to(@person, :notice => 'Person was successfully updated.')
    else
      render :action => "edit"
    end
  end

  # DELETE /people/1
  # DELETE /people/1.xml
  def destroy
    Person.find(params[:id]).destroy
    redirect_to(people_url)
  end
end

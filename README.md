# Hospital_ReactApp
Simple application which lets you manage patients and their medical records. Written in ASP.NET Core and React JS.

# Description
The backend side of the application uses SqlLite database which stores two entities: `Patient` and `Record`. For both of them CRUD controllers were implemented. 
Moreover, simplified authentication and authorization mechanisms using JWT were added. The user is able to choose one of the roles: `Doctor` and `Admin` and
then receive a JWT with the corresponding permissions. The backend api also has Swagger support.

The frontend side has two pages with patients and records. The buttons for managing entities are displayed depending on the user role. The role, as well as the JWT,
are stored in the local storage.

# Demo
The frontend demo of the project can be seen here: https://lavanda888boy.github.io/Hospital_ReactApp/

However, the backend should be executed separately separately on the same device.

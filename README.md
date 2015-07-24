KSD Code Exercise

Overview
The objective is to create a simple database-driven web application for keeping track of inventory.
1.  Each item in the inventory will have a name, a serial number, a type, the room it is located in, the city it is located in, and the date it was added. For example:

    Name: John's Desktop Computer
    Serial Number: 238-1338-22
    Type: Desktop
    Room: 251
    City: Kansas City
    Date: 2015-05-01

The name, serial number, and room are arbitrarily given by the user of the application when adding or updating entries (they can be anything). The type and city should be selected from a list of available options. For example:

    Types: Desktop, Laptop, Television, and DVD Player
    Cities: Kansas City, Topeka, and Wichita

The date should be automatically assigned by the application when the entry is added.

2.  The application should provide ways of adding, updating, or removing entries from the inventory.

3.  The main page of the application should provide a means of viewing all items currently in the inventory, along with ways to filter or trim the list down to find desired entries. What filters are available or the flexibility given to the user for this ability is left up to you. Do what you think is the most user friendly and most helpful. Try to anticipate what a user may want to find, and build your application so that finding it is as seamless as possible.
There is no need for a login or permissions system, etc. Concentrate on the 3 tasks above. The application does not need to be perfect.
Front End
The design of the user interface is left up to you. Feel free to use any Javascript or CSS libraries/frameworks you like (such as Bootstrap or Foundation). It does not need to be perfect or necessarily pretty. Functionality, intuitiveness, and usability are much more important.

Back End
As mentioned, please use a modern web framework (PHP preferred) of your choosing along with a relational database you feel comfortable working with (MySQL preferred). You can write the SQL queries yourself, or use model-based abstractions from an ORM you like.

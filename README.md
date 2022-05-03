-----------------------------------------------------------How to run site------------------------------------------------------------

1. open VCode and clone repositry with these 3 command lines in a new terminal:
    
    git init

    git clone 

    cd 'WEBDEV CW2'

2. Install node.js

3. Install dependencies using following command lines (also ensure you have downloaded node.js to your computer):

   npm install express

   npm install nedb --save 

   npm i mustache-express

   npm install bcrypt

   install jsonwebtoken 

   install dotenv

   install cookie-parser

4. in terminal enter this commandline to run code:

   node index.js

5. On a new chromium browser(Chrome, edge, firefox et....) enter http://localhost:5000/

6. To gain access to admin login use http://localhost:5000/Login as there is no navigation on the site to this page



-----------------------------------------------Changes to my initial design plans----------------------------------------------------

1. as NeDB does not have a display image option I changed the menu cards to take up the full width of the screen, this looked more appealing.

2. The "/" was changed to the menu page as to remove any navigation to the login or registration for admin, I also changed some of the titles on the nav bar for this reason.

3. I added a location page because I had to get rid of the account page, on this page it shows a location of GCU because this company does not actually exsist.

4. I made the landing page for the admin make them navigate to another page where they can add a meal via form. I did this because I wanted the admin to have an initial view of what the user may see, it is also good for functionality.

5. I added a slideshow on my about page and redesigned the whole page as during implementtaion I found it may be more user inclusive.
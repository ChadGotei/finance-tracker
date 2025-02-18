### Models planning

- Our backend is going to have two models as of now one for the transaction which is just going to store the information related to the transactions, it is also going to have an option for category.

- So this is how categories is going to be implemented, as we know that categories are going to be pre defined so we define some n number of categories and in transaction model its going to be an enum. 

- Categories model, im planning to make a structure such as :

Categories : [
    {
        name: "1"  // some name tbd
        ...fields
    },
    {
        name: "2" 
        ...fields
    }
    etc.
]

so this is how categories model is going to look we can simply look at the the category name which we get from new transaction look up that transation in the categories table and put the info there basically connecting these two fields


<!-- HOW API WORKS -->
-> There are pre defined classes in categories, whenever we send a post request to our transaction i.e whenever we create a transaction then category name must be provided in that transaction as well, so what our fn does is it fetches the name of category from transaction body (req.body in post request). Then it searches for that name in category and when we find that name we push back our transaction id into transactions array of categories.

-> sort of same happens for delete as well.

-> hence achieving the categories model displayed above as an example and ensuring the integration of both transaction and categories along with smooth workflow.
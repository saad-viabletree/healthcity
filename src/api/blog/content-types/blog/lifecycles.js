const { ApplicationError } = require("@strapi/utils").errors;
module.exports = {
    async beforeCreate(event) {
        // Check if the author relation is defined and not empty
        if (!event.params.data.author || !event.params.data.author.connect || event.params.data.author.connect.length === 0) {
            throw new ApplicationError('Author not found');
        }

        if (!event.params.data.categories || !event.params.data.categories.connect || event.params.data.categories.connect.length === 0) {
            throw new ApplicationError('Category not found');
        }

        if (!event.params.data.tags || !event.params.data.tags.connect || event.params.data.tags.connect.length === 0) {
            throw new ApplicationError('Tags not found');
        }

        // Additional code can go here if needed
    },


    async beforeUpdate(event) {
      console.log("event", event)
        const tagsUpdated = await strapi.entityService.findOne(
            "api::blog.blog",
            event.params.where.id,
            {
              populate: [
                "tags",
                "categories",
                "author"
                
              ],
            }
          );

          if(tagsUpdated.tags.length === 0 && event.params.data.tags.connect.length === 0){
            throw new ApplicationError('Tags not found');
              
            
          }

          if(tagsUpdated.categories.length === 0 && event.params.data.categories.connect.length === 0){
            throw new ApplicationError('Categories not found');
              
            
          } else if(tagsUpdated.categories.length === 1 && event.params.data.author.disconnect.length === 1){
            throw new ApplicationError('Categories is required');

          }

            console.log(tagsUpdated.author);
            console.log('disconnect', event.params.data.author.disconnect.length)
            console.log('connect', event.params.data.author.connect.length)

          if(!tagsUpdated.author && event.params.data.author.connect.length === 0){
            throw new ApplicationError('Author not found');
              
            
          }else if(!tagsUpdated.author && event.params.data.author.disconnect.length === 1) {
            throw new ApplicationError('saad is here');

          }
          else if(tagsUpdated.author && event.params.data.author.disconnect.length === 1 && event.params.data.author.connect.length === 0){
            // console.log(tagsUpdated.author);
            // console.log('disconnect', event.params.data.author.disconnect.length)
            // console.log('connect', event.params.data.author.connect.length)

            //console.log(tagsUpdated.author);
            throw new ApplicationError('Author is required');

          }
        //   else if(tagsUpdated.author && event.params.data.author.disconnect.length === 1){
        //     console.log(tagsUpdated.author);
        //     console.log(event.params.data.author.disconnect.length)
        //     //console.log(tagsUpdated.author);
        //     throw new ApplicationError('Author is required');

        //   }
          
          
        
        // Check if the author relation is defined and not empty
        // if (!event.params.data.author || !event.params.data.author.connect || event.params.data.author.connect.length === 0) {
        //     throw new ApplicationError('Author not found');
        // }

        // if (!event.params.data.categories || !event.params.data.categories.connect || event.params.data.categories.connect.length === 0) {
        //     throw new ApplicationError('Category not found');
        // }

        // if (!event.params.data.tags || !event.params.data.tags.connect || event.params.data.tags.connect.length === 0) {
        //     throw new ApplicationError('Tags not found');
        // }

        // Additional code can go here if needed
    }
}
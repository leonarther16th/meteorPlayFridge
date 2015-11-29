

Products = new Mongo.Collection('products');


if (Meteor.isClient) {


  Template.fridge.helpers({
    products: function () {
      return Products.find({
          place: 'fridge'
      });
    }
  });

  Template.supermarket.helpers({
      products: function() {
          return Products.find({
              place: 'supermarket'
          });
      }

  });

  Template.stats.helpers({
      fridgeProductNum: function(){
          return Products.find({
              place: 'fridge'
          }).count();
      },
      supermarketProductNum: function(){
          return Products.find({
              place: 'supermarket'
          }).count();
      }
  });

  Template.addProduct.events({
    "submit form": function(event, ui){
        //ui.$('.container').hide();
        event.preventDefault();
        var newProduct = event.target.newProduct.value;
        Products.insert({
            name: newProduct,
            place: 'supermarket'
        });
        event.target.newProduct.value = '';
    }
  });

  Template.fridge.onRendered(function(){
      var templateInstance = this;

      templateInstance.$('#fridge').droppable({
          drop: function(evt, ui){
              // do something
              var query = { _id: ui.draggable.data('id') };
              var changes = { $set: { place: 'fridge' }};
              Products.update(query, changes);
          }
      });
  });

    Template.supermarket.onRendered(function(){
        var templateInstance = this;

        templateInstance.$('#supermarket').droppable({
            drop: function(evt, ui){
                // do something
                var query = { _id: ui.draggable.data('id') };
                var changes = { $set: { place: 'supermarket' }};
                Products.update(query, changes);
            }
        });
    });


  Template.productListItem.onRendered(function(){
      var templateInstance = this;

      templateInstance.$('.draggable').draggable({
          cursor: 'move',
          helper: 'clone'
      });

      templateInstance.$('.remove-product').click(function(evt){
          var productId = $(this).data('id');

          Products.remove({_id: productId});

      });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {



  });
}

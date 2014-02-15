if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to dropzone-test.";
  };
}

if (Meteor.isServer) {

  Router.map(function () {
    this.route('upload-creatives', {
      where: 'server',
      action: function () {
        var fs = Npm.require('fs');
        var path = Npm.require('path');
        var self = this;

        // dropzone.js stores the uploaded file in the /tmp directory
        // we access the /tmp directory
        fs.readFile(self.request.files.file.path, function (err, data) {

          // and then write the file to the uploads directory
          fs.writeFile('/uploads/' + self.request.files.file.name, data, function (error) {
            if(error){
              console.error(error);
            }
          });
        });
      }
    });

    this.route('upload-products', {
      where: 'server',
      action: function () {
        var fs = Npm.require('fs');
        var path = Npm.require('path');
        var self = this;

        // dropzone.js stores the uploaded file in the /tmp directory
        // we access the /tmp directory
        fs.readFile(self.request.files.file.path, function (err, data) {

          // and then write the file to the uploads directory
          fs.writeFile(self.request.files.file.name, data, function (error) {
            if(error){
              console.error(error);
            }
          });
        });
      }
    });

  });

}

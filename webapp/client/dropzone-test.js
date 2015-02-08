if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to dropzone-ui.";
  };

  Router.configure({
  	layoutTemplate: 'mainLayout'
  });

  Router.map(function () {
    this.route('hello', {
      path: '/',
      template: 'hello'
    });
  });
}

if (Meteor.isServer) {

  Router.map(function () {
    this.route('uploads', {
      where: 'server',
      action: function () {
        console.log('/upload triggered... ');

        var fs = Npm.require('fs');
        var path = Npm.require('path');
        var self = this;

        ROOT_APP_PATH = fs.realpathSync('.');
        console.log('ROOT_APP_PATH: ', ROOT_APP_PATH);
        console.log('this.request.files.file.path', this.request.files.file.path);


        // dropzone.js stores the uploaded file in the /tmp directory
        // we access the /tmp directory
        fs.readFile(self.request.files.file.path, function (err, data) {

          // and then write the file to the uploads directory
          fs.writeFile(ROOT_APP_PATH + "/assets/app/uploads/" +self.request.files.file.name, data, 'binary', function (error, result) {
            if(error){
              console.error(error);
            }
            if(result){
              console.log('Success! ', result);
            }
          });
        });


      }
    });
  });

}

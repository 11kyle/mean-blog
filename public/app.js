(function () {
  angular
    .module("BlogApp", [])
    .controller("BlogController", BlogController);

  function BlogController($scope, $http) {
    $scope.createPost = createPost;
    $scope.deletePost = deletePost;
    $scope.editPost = editPost;
    $scope.updatePost = updatePost;

    // Things to load first
    function init() {
      getAllPosts();
    }
    init(); // call init

    function clearFields() {
      $scope.post.title = "";
      $scope.post.body = "";
    }

    function updatePost(post) {
      $scope.submitButton = "Post";
      console.log(post);
      $http
        .put("/api/blogpost/" + post._id, post)
        .then(function() {
            getAllPosts();
            clearFields();
          }
        );
    }

    function editPost(postId) {

      $scope.submitButton = "Update"; // Set button text to Update

      $http.get("/api/blogpost/" + postId)
      .then(
        function(data) {
          var post = data.data;
          $scope.post = post;
          console.log(post);
        }
      );
    }

    function deletePost(postId) {
      $http
        .delete("/api/blogpost/" + postId)
        .then(getAllPosts);
    }

    // get all blog posts
    function getAllPosts() {
      $http
        .get("/api/blogpost") //not saying which one so must be all
        .then(function (data) {
          var posts = data.data;
          $scope.posts = posts;
          $scope.submitButton = "Post";
        });
    }

    // creates a post
    function createPost(post) {
      $http
        .post("/api/blogpost", post) // not saying which one so must be all
        .then(function() {
            getAllPosts();
            clearFields();
          }
        );
    }
  }

})();

(function () {
  angular.module("BlogApp", ["ngSanitize"]) //add ngSanatize
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

    // Clear the input fields
    function clearFields() {
      $scope.post.title = "";
      $scope.post.body = "";
    }

    // Update post
    function updatePost(post) {
      $http
        .put("/api/blogpost/" + post._id, post)
        .then(function() {
            getAllPosts();
            clearFields();
            $scope.post = {}; // Clear the selected post so the user can create a new post
          }
        );
    }

    // Edit post
    function editPost(postId) {
      $http.get("/api/blogpost/" + postId)
      .then(
        function(data) {
          $scope.post = data.data;
        }
      );
    }

    // Delete Post
    function deletePost(postId) {
      $http
        .delete("/api/blogpost/" + postId)
        .then(getAllPosts);
    }

    // Get all blog posts
    function getAllPosts() {
      $http
        .get("/api/blogpost") //not saying which one so must be all
        .then(function (data) {
          $scope.posts = data.data;
        });
    }

    // Create a post
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

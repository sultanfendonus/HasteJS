export const routes = {
  "routes": [
    {
      "method": "GET",
      "path": "/post",
      "controller": "post.find",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "GET",
      "path": "/post/count",
      "controller": "post.count",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "GET",
      "path": "/post/:id",
      "controller": "post.findOne",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "POST",
      "path": "/post",
      "controller": "post.create",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "PUT",
      "path": "/post/:id",
      "controller": "post.update",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "DELETE",
      "path": "/post/:id",
      "controller": "post.delete",
      "config": {
        "middleware": []
      }
    }
  ]
}
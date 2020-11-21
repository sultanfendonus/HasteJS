export const routes = {
  "routes": [
    {
      "method": "GET",
      "path": "/category",
      "controller": "category.find",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "GET",
      "path": "/category/count",
      "controller": "category.count",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "GET",
      "path": "/category/:id",
      "controller": "category.findOne",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "POST",
      "path": "/category",
      "controller": "category.create",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "PUT",
      "path": "/category/:id",
      "controller": "category.update",
      "config": {
        "middleware": []
      }
    },
    {
      "method": "DELETE",
      "path": "/category/:id",
      "controller": "category.delete",
      "config": {
        "middleware": []
      }
    }
  ]
}
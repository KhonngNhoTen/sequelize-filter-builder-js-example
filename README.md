The Project is example for filter builder + filter builder.

To run project, please init database by run command:

```js
npm run init-db:run
```

### CONFIG FILTER BUILDER
In `src/before-start-app.js`, entry file:

```js
async function beforeStartApp(app) {
  await authenticate();

  FilterBuilderConfig.config({
    type: "sequelize",
  });
}

```

### Usage:
In `StudentController`, use FilterBuilder:
```js
StudentController.list = async (req, res, next) => {
  try {
    const filter = new FilterBuilder(Student, req.query)
      .like("name")
      .equal("id")
      .leftJoin(Course, "courses");

    const data = await filter.run();

    next(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};


```

Hoping this example will help you!
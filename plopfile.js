module.exports = function plopFile(plop) {
  plop.setHelper('upperCase', text => text.toUpperCase());

  const storybookPrompt = {
    type: 'confirm',
    name: 'addStories',
    message: 'do you want a stories file (Storybook)?',
    default: true,
  };

  const stylesPrompt = {
    type: 'confirm',
    name: 'addStyleSheet',
    message: 'do you want a stylesheet file (scss)?',
    default: true,
  };

  const storybookAction = (actions, data, context = 'dumb') => {
    if (data.addStories) {
      actions.push({
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{pascalCase name}}.stories.js',
        templateFile: `plop-templates/${context}/component-${context}-stories.hbs`,
      });
    }
  };

  const stylesAction = (actions, data) => {
    if (data.addStyleSheet) {
      actions.push({
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{kebabCase name}}.scss',
        templateFile: 'plop-templates/shared/styles.hbs',
      });
    }
  };

  plop.setGenerator('component-dumb', {
    description: 'react component (dumb)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name?',
      },
      stylesPrompt,
      storybookPrompt,
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.js',
          templateFile: 'plop-templates/dumb/component-dumb.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.spec.js',
          templateFile: 'plop-templates/dumb/component-dumb.spec.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/index.js',
          templateFile: 'plop-templates/shared/component-barrel.hbs',
        },
      ];

      storybookAction(actions, data);
      stylesAction(actions, data);

      return actions;
    },
  });

  plop.setGenerator('component-redux', {
    description: 'react component connected to redux',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name?',
      },
      {
        type: 'input',
        name: 'storeProperty',
        message: 'top level property in redux store? eg: users',
      },
      {
        type: 'input',
        name: 'baseActionName',
        message: 'base action name name? eg: getUsers',
        default: 'replaceMe',
      },
      stylesPrompt,
      storybookPrompt,
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.js',
          templateFile: 'plop-templates/redux/component-redux.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.spec.js',
          templateFile: 'plop-templates/redux/component-redux.spec.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/actions/{{camelCase name}}.js',
          templateFile: 'plop-templates/redux/action-creator.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/actions/{{camelCase name}}.spec.js',
          templateFile: 'plop-templates/redux/action-creator.spec.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/reducers/{{camelCase name}}.js',
          templateFile: 'plop-templates/redux/reducer.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/reducers/{{camelCase name}}.spec.js',
          templateFile: 'plop-templates/redux/reducer.spec.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/index.js',
          templateFile: 'plop-templates/shared/component-barrel.hbs',
        },
      ];

      storybookAction(actions, data, 'redux');
      stylesAction(actions, data);

      actions.push(
        `[IMPORTANT] Remember to add the reducer to rootReducer. The root key is ${
          data.storeProperty
        }.`,
      );

      return actions;
    },
  });

  plop.setGenerator('hook', {
    description: 'react hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'hook name?',
      },
      {
        type: 'confirm',
        name: 'addStories',
        message: 'do you want a stories file (Storybook)?',
        default: true,
      },
    ],
    actions: data => {
      if (data.name.indexOf('use') !== 0) {
        // eslint-disable-next-line no-param-reassign
        data.name = `use${data.name}`;
      }

      const actions = [
        {
          type: 'add',
          path: 'src/components/hooks/{{camelCase name}}/{{camelCase name}}.js',
          templateFile: 'plop-templates/hooks/hooks-hook.hbs',
        },
        {
          type: 'add',
          path: 'src/components/hooks/{{camelCase name}}/{{camelCase name}}.spec.js',
          templateFile: 'plop-templates/hooks/hooks.spec.hbs',
        },
      ];

      if (data.addStories) {
        actions.push({
          type: 'add',
          path: 'src/components/hooks/{{camelCase name}}/{{camelCase name}}.stories.js',
          templateFile: 'plop-templates/hooks/hooks.stories.hbs',
        });
      }

      actions.push('[IMPORTANT] Remember to add the hook to /src/components/hooks/index.js');

      return actions;
    },
  });
};

export default function (plop) {
  // Module generator
  plop.setGenerator('module', {
    description: 'Generate a new module with complete structure',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name (e.g., user, associate, workflow):',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Module name is required';
        },
      },
      {
        type: 'input',
        name: 'entity',
        message: 'Main entity name (PascalCase, e.g., User, Associate):',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Entity name is required';
        },
      },
      {
        type: 'confirm',
        name: 'includeRepository',
        message: 'Include repository files?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'includeService',
        message: 'Include service files?',
        default: true,
      },
    ],
    actions: function (data) {
      const actions = [];

      // Module configuration file
      actions.push({
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: 'plop-templates/module.hbs',
      });

      // Repository files
      if (data.includeRepository) {
        actions.push(
          {
            type: 'add',
            path: 'src/modules/{{kebabCase name}}/repositories/{{kebabCase entity}}-repository.interface.ts',
            templateFile: 'plop-templates/repository-interface.hbs',
          },
          {
            type: 'add',
            path: 'src/modules/{{kebabCase name}}/repositories/prisma-{{kebabCase entity}}.repository.ts',
            templateFile: 'plop-templates/repository-implementation.hbs',
          }
        );
      }

      // Service files
      if (data.includeService) {
        actions.push({
          type: 'add',
          path: 'src/modules/{{kebabCase name}}/services/{{kebabCase name}}.service.ts',
          templateFile: 'plop-templates/service.hbs',
        });
      }

      // Create placeholder folders and basic structure
      actions.push(
        {
          type: 'add',
          path: 'src/modules/{{kebabCase name}}/use-cases/.gitkeep',
          template: '',
        },
        {
          type: 'add',
          path: 'src/modules/{{kebabCase name}}/use-cases/dtos/.gitkeep',
          template: '',
        }
      );

      return actions;
    },
  });

  // Use Case generator
  plop.setGenerator('use-case', {
    description: 'Generate a new use case within an existing module',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'Module name (kebab-case, e.g., user, associate):',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Module name is required';
        },
      },
      {
        type: 'input',
        name: 'action',
        message: 'Use case action (kebab-case, e.g., create-user, find-by-id):',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Use case action is required';
        },
      },
      {
        type: 'input',
        name: 'entity',
        message: 'Entity name (PascalCase, e.g., User, Associate):',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Entity name is required';
        },
      },
      {
        type: 'confirm',
        name: 'includeController',
        message: 'Include controller?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'includeDTO',
        message: 'Include DTO?',
        default: true,
      },
    ],
    actions: function (data) {
      const actions = [];

      // Use case file
      actions.push({
        type: 'add',
        path: 'src/modules/{{kebabCase module}}/use-cases/{{kebabCase action}}/{{kebabCase action}}.use-case.ts',
        templateFile: 'plop-templates/use-case.hbs',
      });

      // Controller file
      if (data.includeController) {
        actions.push({
          type: 'add',
          path: 'src/modules/{{kebabCase module}}/use-cases/{{kebabCase action}}/{{kebabCase action}}.controller.ts',
          templateFile: 'plop-templates/controller.hbs',
        });
      }

      // DTO file
      if (data.includeDTO) {
        actions.push({
          type: 'add',
          path: 'src/modules/{{kebabCase module}}/use-cases/dtos/{{kebabCase action}}.dto.ts',
          templateFile: 'plop-templates/dto.hbs',
        });
      }

      // Factory file
      actions.push({
        type: 'add',
        path: 'src/modules/{{kebabCase module}}/use-cases/{{kebabCase action}}/{{kebabCase action}}.factory.ts',
        templateFile: 'plop-templates/factory.hbs',
      });

      // Test file
      actions.push({
        type: 'add',
        path: 'src/modules/{{kebabCase module}}/use-cases/{{kebabCase action}}/{{kebabCase action}}.spec.ts',
        templateFile: 'plop-templates/spec.hbs',
      });

      return actions;
    },
  });

  // Add script to package.json
  plop.setActionType('updatePackageJson', function (answers, config) {
    const fs = require('fs');
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!packageJson.scripts.plop) {
      packageJson.scripts.plop = 'plop';
      fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
      return 'Added plop script to package.json';
    }
    
    return 'Plop script already exists in package.json';
  });
}
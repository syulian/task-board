## Launching the project

```
npm run dev – starts a local Next.js development server with Turbopack for fast builds.
npm run build – builds a production build of the Next.js application.
npm run start – starts the built production server.
```

----

## Scripts

* `npm run dev` – starts a local Next.js development server with **Turbopack** for fast builds.
* `npm run build` – builds a production build of the Next.js application.
* `npm run start` – starts the built production server.
* `npm run lint` – checks the code using **ESLint**.
* `npm run prettier` – formats all files in the project using **Prettier**.
* `npm run codegen` – generates types and hooks for GraphQL queries using **GraphQL Code Generator**.
* `npm run test:unit` – runs **Jest** for unit tests with the configuration `config/jest/jest.config.ts`.
* `npm run test:e2e` – runs **Playwright** for end-to-end tests with the configuration `playwright.config.ts`.
* `npm run test:e2e:report` – opens the Playwright report after running the tests.
* `npm run storybook` – runs **Storybook** in development mode on port `6006`.
* `npm run build-storybook` – builds a static version of **Storybook** for deployment.
* `npm run prepare` – initializes **Husky** to run pre-commit and pre-push hooks.

----

## Project architecture

The project was written in accordance with the Feature sliced design methodology.

Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Linting

The project uses eslint to check typescript code, strictly control key architectural principles, and ensure accessibility.

##### Running linters

* `npm run lint` – checks the code using **ESLint**.
* `npm run prettier` – formats all files in the project using **Prettier**.

----

## Storybook

The project describes story cases for each component.
Requests to the server are mocked using storybook-addon-mock.

The file with story cases is created next to the component with the extension .stories.tsx

You can run the storybook with the command:
- `npm run storybook`

Example of a story file:

```typescript jsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, StoreDecorator, InlineDecorator } from '@shared/config';
import { BOARD_ID, SESSION } from '@shared/const';
import Header from './Header';

const meta: Meta<typeof Header> = {
    title: 'Widgets/Header/Header',
    component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
    decorators: [
        ApolloDecorator([]),
        SessionDecorator(SESSION),
        StoreDecorator({
            rightSidebar: {
                isExpanded: false,
            },
        }),
        InlineDecorator,
    ],
    parameters: {
        nextjs: {
            navigation: {
                segments: [['id', BOARD_ID]],
            },
        },
    },
};
```

## Project configuration

The project is built on **Next.js**, using its built-in configuration system.

The builder is optimized for performance with **Turbopack** in development mode and Next.js compiler in production.

Build:
- **[Next.js](./next.config.ts)**

----

## CI pipeline and pre-commit hooks

The GitHub Actions configuration is located in ./.github/workflows.
All types of tests, project and storybook builds, and linting are run in CI.

In pre-commit hooks, we check the project with linters, config in ./.husky

----

## Working with data

Data management is handled using **Redux Toolkit** for client-side state.

Server communication is implemented through **Apollo Client** with **GraphQL**.

Schema-based types and hooks are automatically generated using **GraphQL Code Generator**, ensuring type safety and consistency between client and server.


----

## Routing

Routing is managed by the built-in **Next.js App Router**.

Dynamic and nested routes are located in the [app](./app) directory.

For accessing route parameters and navigation, we use [next/navigation](https://nextjs.org/docs/app/api-reference/functions/use-router).

----

## Entities

- [Board](./src/entities/Board)
- [Label](./src/entities/Label)
- [Task](./src/entities/Task)
- [User](./src/entities/User)

## Features

- [Auth](./src/features/Auth)
- [EditBoard](./src/features/EditBoard)
- [List](./src/features/List)
- [NavigationMenu](./src/features/NavigationMenu)
- [RightSidebar](./src/features/RightSidebar)
- [SearchInput](./src/features/SearchInput)
- [SessionInfo](./src/features/SessionInfo)
- [Switcher](./src/features/Switcher)

## Widgets

- [Board](./src/widgets/Board)
- [Header](./src/widgets/Header)
- [LeftSidebar](./src/widgets/LeftSidebar)

## Pages

- [BoardPage](./src/pages/BoardPage)
- [HomePage](./src/pages/HomePage)
- [NotFoundPage](./src/pages/NotFoundPage)

## Shared

- The project uses a custom [UI library](./src/shared/ui). All UI components are located in ./src/shared/ui.
- All assets are located in ./src/shared/assets: [assets](./src/shared/assets).
- All auxiliary development tools, such as hooks, contexts, wrappers, or testing helpers, are located in ./src/shared/lib: [lib](./src/shared/lib).
- The [config](./src/shared/config) folder contains configuration files.
// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Board = {
  __typename?: 'Board';
  groupId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type BoardInput = {
  groupId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type BoardsGroup = {
  __typename?: 'BoardsGroup';
  id: Scalars['ID']['output'];
  items: Array<Board>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type FullBoard = {
  __typename?: 'FullBoard';
  groupId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  listsCount?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  tasksCount?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['ID']['output'];
};

export type Label = {
  __typename?: 'Label';
  board: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type List = {
  __typename?: 'List';
  board: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<Task>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createBoardsGroup: BoardsGroup;
  createLabel: Label;
  createList: List;
  createTask: Task;
  createUser: User;
  deleteBoard: Scalars['ID']['output'];
  deleteBoardsGroup: Scalars['ID']['output'];
  deleteLabel: Scalars['ID']['output'];
  deleteList: Scalars['ID']['output'];
  deleteTask: Scalars['ID']['output'];
  updateBoard?: Maybe<Board>;
  updateBoardsGroup?: Maybe<BoardsGroup>;
  updateBoardsOrders: Array<BoardsGroup>;
  updateLabel?: Maybe<Label>;
  updateLabelsOrders: Array<Label>;
  updateList?: Maybe<List>;
  updateListsOrders: Array<List>;
  updateSubtask?: Maybe<Task>;
  updateTask?: Maybe<Task>;
  updateTasksOrders: Array<List>;
};


export type MutationCreateBoardArgs = {
  groupId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateBoardsGroupArgs = {
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateLabelArgs = {
  boardId: Scalars['ID']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateListArgs = {
  boardId: Scalars['ID']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
  task: TaskInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBoardsGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLabelArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteListArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateBoardArgs = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBoardsGroupArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateBoardsOrdersArgs = {
  boards: Array<BoardInput>;
};


export type MutationUpdateLabelArgs = {
  color: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateLabelsOrdersArgs = {
  boardId: Scalars['String']['input'];
  labels: Array<OrderInput>;
};


export type MutationUpdateListArgs = {
  boardId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateListsOrdersArgs = {
  boardId: Scalars['String']['input'];
  lists: Array<OrderInput>;
};


export type MutationUpdateSubtaskArgs = {
  checked?: InputMaybe<Scalars['Boolean']['input']>;
  subtaskId?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTaskArgs = {
  task: TaskUpdateInput;
};


export type MutationUpdateTasksOrdersArgs = {
  boardId: Scalars['ID']['input'];
  tasks: Array<TaskUpdateInput>;
};

export type OrderInput = {
  id: Scalars['ID']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getBoard?: Maybe<FullBoard>;
  getBoardsGroups: Array<BoardsGroup>;
  getGroupedTasks: Array<TaskGroupByDate>;
  getLabels: Array<Label>;
  getLists: Array<List>;
  getTasks: Array<TaskGroup>;
};


export type QueryGetBoardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLabelsArgs = {
  boardId: Scalars['ID']['input'];
};


export type QueryGetListsArgs = {
  boardId: Scalars['ID']['input'];
};


export type QueryGetTasksArgs = {
  boardId: Scalars['ID']['input'];
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  labels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Subtask = {
  __typename?: 'Subtask';
  checked: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type SubtaskInput = {
  checked?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  body?: Maybe<Scalars['String']['output']>;
  complete: Scalars['Boolean']['output'];
  dueDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  labels?: Maybe<Array<Label>>;
  list: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  subtasks?: Maybe<Array<Subtask>>;
  title: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type TaskGroup = {
  __typename?: 'TaskGroup';
  board?: Maybe<Board>;
  body?: Maybe<Scalars['String']['output']>;
  complete?: Maybe<Scalars['Boolean']['output']>;
  dueDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  list: List;
  title: Scalars['String']['output'];
};

export type TaskGroupByDate = {
  __typename?: 'TaskGroupByDate';
  date: Scalars['Date']['output'];
  tasks: Array<TaskGroup>;
};

export type TaskInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  labels?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  list: Scalars['ID']['input'];
  subtasks?: InputMaybe<Array<SubtaskInput>>;
  title: Scalars['String']['input'];
};

export type TaskUpdateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  complete?: InputMaybe<Scalars['Boolean']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['ID']['input'];
  labels?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  list?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  subtasks?: InputMaybe<Array<SubtaskInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type CreateBoardMutationVariables = Exact<{
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  groupId: Scalars['ID']['input'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', id: string, order: number, name: string, groupId: string } };

export type CreateBoardsGroupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateBoardsGroupMutation = { __typename?: 'Mutation', createBoardsGroup: { __typename?: 'BoardsGroup', id: string, order: number, name: string } };

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: string };

export type GetBoardQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBoardQuery = { __typename?: 'Query', getBoard?: { __typename?: 'FullBoard', id: string, order: number, name: string, groupId: string, listsCount?: number | null, tasksCount?: number | null } | null };

export type GetBoardsGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardsGroupsQuery = { __typename?: 'Query', getBoardsGroups: Array<{ __typename?: 'BoardsGroup', id: string, order: number, name: string, items: Array<{ __typename?: 'Board', id: string, order: number, name: string, groupId: string }> }> };

export type UpdateBoardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard?: { __typename?: 'Board', id: string, name: string, order: number } | null };

export type UpdateBoardsOrdersMutationVariables = Exact<{
  boards: Array<BoardInput> | BoardInput;
}>;


export type UpdateBoardsOrdersMutation = { __typename?: 'Mutation', updateBoardsOrders: Array<{ __typename?: 'BoardsGroup', id: string, name: string, order: number }> };

export type CreateLabelMutationVariables = Exact<{
  name: Scalars['String']['input'];
  color: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  boardId: Scalars['ID']['input'];
}>;


export type CreateLabelMutation = { __typename?: 'Mutation', createLabel: { __typename?: 'Label', id: string, order: number, name: string, color: string, board: string } };

export type DeleteLabelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteLabelMutation = { __typename?: 'Mutation', deleteLabel: string };

export type GetLabelsQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type GetLabelsQuery = { __typename?: 'Query', getLabels: Array<{ __typename?: 'Label', id: string, order: number, name: string, color: string, board: string }> };

export type UpdateLabelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  color: Scalars['String']['input'];
}>;


export type UpdateLabelMutation = { __typename?: 'Mutation', updateLabel?: { __typename?: 'Label', id: string, name: string, color: string, board: string } | null };

export type UpdateLabelsOrdersMutationVariables = Exact<{
  labels: Array<OrderInput> | OrderInput;
  boardId: Scalars['String']['input'];
}>;


export type UpdateLabelsOrdersMutation = { __typename?: 'Mutation', updateLabelsOrders: Array<{ __typename?: 'Label', id: string, name: string, color: string, board: string }> };

export type CreateTaskMutationVariables = Exact<{
  task: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, order: number, list: string, title: string, dueDate?: any | null, body?: string | null, complete: boolean, subtasks?: Array<{ __typename?: 'Subtask', id: string, order: number, value: string, checked: boolean }> | null, labels?: Array<{ __typename?: 'Label', id: string, name: string, color: string }> | null } };

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: string };

export type GetGroupedTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupedTasksQuery = { __typename?: 'Query', getGroupedTasks: Array<{ __typename?: 'TaskGroupByDate', date: any, tasks: Array<{ __typename?: 'TaskGroup', id: string, title: string, body?: string | null, dueDate?: any | null, complete?: boolean | null, board?: { __typename?: 'Board', id: string, name: string } | null, list: { __typename?: 'List', id: string, name: string } }> }> };

export type GetTasksQueryVariables = Exact<{
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  labels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  boardId: Scalars['ID']['input'];
}>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'TaskGroup', id: string, title: string, complete?: boolean | null, dueDate?: any | null, body?: string | null, list: { __typename?: 'List', id: string, name: string } }> };

export type UpdateSubtaskMutationVariables = Exact<{
  taskId?: InputMaybe<Scalars['String']['input']>;
  subtaskId?: InputMaybe<Scalars['String']['input']>;
  checked?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateSubtaskMutation = { __typename?: 'Mutation', updateSubtask?: { __typename?: 'Task', id: string, order: number, list: string, title: string, dueDate?: any | null, body?: string | null, complete: boolean, subtasks?: Array<{ __typename?: 'Subtask', id: string, order: number, value: string, checked: boolean }> | null, labels?: Array<{ __typename?: 'Label', id: string, name: string, color: string }> | null } | null };

export type UpdateTaskMutationVariables = Exact<{
  task: TaskUpdateInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', id: string, order: number, list: string, title: string, dueDate?: any | null, body?: string | null, complete: boolean, subtasks?: Array<{ __typename?: 'Subtask', id: string, order: number, value: string, checked: boolean }> | null, labels?: Array<{ __typename?: 'Label', id: string, name: string, color: string }> | null } | null };

export type UpdateTasksOrdersMutationVariables = Exact<{
  tasks: Array<TaskUpdateInput> | TaskUpdateInput;
  boardId: Scalars['ID']['input'];
}>;


export type UpdateTasksOrdersMutation = { __typename?: 'Mutation', updateTasksOrders: Array<{ __typename?: 'List', id: string, order: number, name: string, color: string, board: string }> };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string } };

export type CreateListMutationVariables = Exact<{
  name: Scalars['String']['input'];
  color: Scalars['String']['input'];
  boardId: Scalars['ID']['input'];
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'List', id: string, order: number, name: string, color: string, board: string } };

export type DeleteListMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList: string };

export type GetListsQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type GetListsQuery = { __typename?: 'Query', getLists: Array<{ __typename?: 'List', id: string, order: number, name: string, color: string, board: string, items: Array<{ __typename?: 'Task', id: string, order: number, title: string, complete: boolean, dueDate?: any | null, body?: string | null, list: string, subtasks?: Array<{ __typename?: 'Subtask', id: string, order: number, value: string, checked: boolean }> | null, labels?: Array<{ __typename?: 'Label', id: string, name: string, color: string }> | null }> }> };

export type UpdateListMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  boardId: Scalars['ID']['input'];
}>;


export type UpdateListMutation = { __typename?: 'Mutation', updateList?: { __typename?: 'List', id: string, order: number, name: string, color: string, board: string } | null };

export type UpdateListsOrdersMutationVariables = Exact<{
  lists: Array<OrderInput> | OrderInput;
  boardId: Scalars['String']['input'];
}>;


export type UpdateListsOrdersMutation = { __typename?: 'Mutation', updateListsOrders: Array<{ __typename?: 'List', id: string, order: number, name: string, color: string, board: string, items: Array<{ __typename?: 'Task', id: string, order: number, title: string, complete: boolean, dueDate?: any | null, body?: string | null, list: string }> }> };

export type DeleteBoardsGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBoardsGroupMutation = { __typename?: 'Mutation', deleteBoardsGroup: string };

export type UpdateBoardsGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateBoardsGroupMutation = { __typename?: 'Mutation', updateBoardsGroup?: { __typename?: 'BoardsGroup', id: string, name: string, order: number } | null };


export const CreateBoardDocument = gql`
    mutation CreateBoard($name: String!, $order: Int, $groupId: ID!) {
  createBoard(name: $name, order: $order, groupId: $groupId) {
    id
    order
    name
    groupId
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      name: // value for 'name'
 *      order: // value for 'order'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const CreateBoardsGroupDocument = gql`
    mutation CreateBoardsGroup($name: String!, $order: Int) {
  createBoardsGroup(name: $name, order: $order) {
    id
    order
    name
  }
}
    `;
export type CreateBoardsGroupMutationFn = Apollo.MutationFunction<CreateBoardsGroupMutation, CreateBoardsGroupMutationVariables>;

/**
 * __useCreateBoardsGroupMutation__
 *
 * To run a mutation, you first call `useCreateBoardsGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardsGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardsGroupMutation, { data, loading, error }] = useCreateBoardsGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useCreateBoardsGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardsGroupMutation, CreateBoardsGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardsGroupMutation, CreateBoardsGroupMutationVariables>(CreateBoardsGroupDocument, options);
      }
export type CreateBoardsGroupMutationHookResult = ReturnType<typeof useCreateBoardsGroupMutation>;
export type CreateBoardsGroupMutationResult = Apollo.MutationResult<CreateBoardsGroupMutation>;
export type CreateBoardsGroupMutationOptions = Apollo.BaseMutationOptions<CreateBoardsGroupMutation, CreateBoardsGroupMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation DeleteBoard($id: ID!) {
  deleteBoard(id: $id)
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, options);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const GetBoardDocument = gql`
    query GetBoard($id: ID!) {
  getBoard(id: $id) {
    id
    order
    name
    groupId
    listsCount
    tasksCount
  }
}
    `;

/**
 * __useGetBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBoardQuery(baseOptions: Apollo.QueryHookOptions<GetBoardQuery, GetBoardQueryVariables> & ({ variables: GetBoardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
      }
export function useGetBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
        }
export function useGetBoardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
        }
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<typeof useGetBoardLazyQuery>;
export type GetBoardSuspenseQueryHookResult = ReturnType<typeof useGetBoardSuspenseQuery>;
export type GetBoardQueryResult = Apollo.QueryResult<GetBoardQuery, GetBoardQueryVariables>;
export const GetBoardsGroupsDocument = gql`
    query GetBoardsGroups {
  getBoardsGroups {
    id
    order
    name
    items {
      id
      order
      name
      groupId
    }
  }
}
    `;

/**
 * __useGetBoardsGroupsQuery__
 *
 * To run a query within a React component, call `useGetBoardsGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardsGroupsQuery, GetBoardsGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardsGroupsQuery, GetBoardsGroupsQueryVariables>(GetBoardsGroupsDocument, options);
      }
export function useGetBoardsGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsGroupsQuery, GetBoardsGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardsGroupsQuery, GetBoardsGroupsQueryVariables>(GetBoardsGroupsDocument, options);
        }
export function useGetBoardsGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardsGroupsQuery, GetBoardsGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardsGroupsQuery, GetBoardsGroupsQueryVariables>(GetBoardsGroupsDocument, options);
        }
export type GetBoardsGroupsQueryHookResult = ReturnType<typeof useGetBoardsGroupsQuery>;
export type GetBoardsGroupsLazyQueryHookResult = ReturnType<typeof useGetBoardsGroupsLazyQuery>;
export type GetBoardsGroupsSuspenseQueryHookResult = ReturnType<typeof useGetBoardsGroupsSuspenseQuery>;
export type GetBoardsGroupsQueryResult = Apollo.QueryResult<GetBoardsGroupsQuery, GetBoardsGroupsQueryVariables>;
export const UpdateBoardDocument = gql`
    mutation UpdateBoard($id: ID!, $name: String, $groupId: ID) {
  updateBoard(id: $id, name: $name, groupId: $groupId) {
    id
    name
    order
  }
}
    `;
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const UpdateBoardsOrdersDocument = gql`
    mutation UpdateBoardsOrders($boards: [BoardInput!]!) {
  updateBoardsOrders(boards: $boards) {
    id
    name
    order
  }
}
    `;
export type UpdateBoardsOrdersMutationFn = Apollo.MutationFunction<UpdateBoardsOrdersMutation, UpdateBoardsOrdersMutationVariables>;

/**
 * __useUpdateBoardsOrdersMutation__
 *
 * To run a mutation, you first call `useUpdateBoardsOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardsOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardsOrdersMutation, { data, loading, error }] = useUpdateBoardsOrdersMutation({
 *   variables: {
 *      boards: // value for 'boards'
 *   },
 * });
 */
export function useUpdateBoardsOrdersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardsOrdersMutation, UpdateBoardsOrdersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardsOrdersMutation, UpdateBoardsOrdersMutationVariables>(UpdateBoardsOrdersDocument, options);
      }
export type UpdateBoardsOrdersMutationHookResult = ReturnType<typeof useUpdateBoardsOrdersMutation>;
export type UpdateBoardsOrdersMutationResult = Apollo.MutationResult<UpdateBoardsOrdersMutation>;
export type UpdateBoardsOrdersMutationOptions = Apollo.BaseMutationOptions<UpdateBoardsOrdersMutation, UpdateBoardsOrdersMutationVariables>;
export const CreateLabelDocument = gql`
    mutation CreateLabel($name: String!, $color: String!, $order: Int, $boardId: ID!) {
  createLabel(name: $name, color: $color, order: $order, boardId: $boardId) {
    id
    order
    name
    color
    board
  }
}
    `;
export type CreateLabelMutationFn = Apollo.MutationFunction<CreateLabelMutation, CreateLabelMutationVariables>;

/**
 * __useCreateLabelMutation__
 *
 * To run a mutation, you first call `useCreateLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLabelMutation, { data, loading, error }] = useCreateLabelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      order: // value for 'order'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateLabelMutation(baseOptions?: Apollo.MutationHookOptions<CreateLabelMutation, CreateLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLabelMutation, CreateLabelMutationVariables>(CreateLabelDocument, options);
      }
export type CreateLabelMutationHookResult = ReturnType<typeof useCreateLabelMutation>;
export type CreateLabelMutationResult = Apollo.MutationResult<CreateLabelMutation>;
export type CreateLabelMutationOptions = Apollo.BaseMutationOptions<CreateLabelMutation, CreateLabelMutationVariables>;
export const DeleteLabelDocument = gql`
    mutation DeleteLabel($id: ID!) {
  deleteLabel(id: $id)
}
    `;
export type DeleteLabelMutationFn = Apollo.MutationFunction<DeleteLabelMutation, DeleteLabelMutationVariables>;

/**
 * __useDeleteLabelMutation__
 *
 * To run a mutation, you first call `useDeleteLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLabelMutation, { data, loading, error }] = useDeleteLabelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLabelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLabelMutation, DeleteLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLabelMutation, DeleteLabelMutationVariables>(DeleteLabelDocument, options);
      }
export type DeleteLabelMutationHookResult = ReturnType<typeof useDeleteLabelMutation>;
export type DeleteLabelMutationResult = Apollo.MutationResult<DeleteLabelMutation>;
export type DeleteLabelMutationOptions = Apollo.BaseMutationOptions<DeleteLabelMutation, DeleteLabelMutationVariables>;
export const GetLabelsDocument = gql`
    query GetLabels($boardId: ID!) {
  getLabels(boardId: $boardId) {
    id
    order
    name
    color
    board
  }
}
    `;

/**
 * __useGetLabelsQuery__
 *
 * To run a query within a React component, call `useGetLabelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabelsQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetLabelsQuery(baseOptions: Apollo.QueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables> & ({ variables: GetLabelsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
      }
export function useGetLabelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
        }
export function useGetLabelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
        }
export type GetLabelsQueryHookResult = ReturnType<typeof useGetLabelsQuery>;
export type GetLabelsLazyQueryHookResult = ReturnType<typeof useGetLabelsLazyQuery>;
export type GetLabelsSuspenseQueryHookResult = ReturnType<typeof useGetLabelsSuspenseQuery>;
export type GetLabelsQueryResult = Apollo.QueryResult<GetLabelsQuery, GetLabelsQueryVariables>;
export const UpdateLabelDocument = gql`
    mutation UpdateLabel($id: ID!, $name: String!, $color: String!) {
  updateLabel(id: $id, name: $name, color: $color) {
    id
    name
    color
    board
  }
}
    `;
export type UpdateLabelMutationFn = Apollo.MutationFunction<UpdateLabelMutation, UpdateLabelMutationVariables>;

/**
 * __useUpdateLabelMutation__
 *
 * To run a mutation, you first call `useUpdateLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLabelMutation, { data, loading, error }] = useUpdateLabelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useUpdateLabelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLabelMutation, UpdateLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLabelMutation, UpdateLabelMutationVariables>(UpdateLabelDocument, options);
      }
export type UpdateLabelMutationHookResult = ReturnType<typeof useUpdateLabelMutation>;
export type UpdateLabelMutationResult = Apollo.MutationResult<UpdateLabelMutation>;
export type UpdateLabelMutationOptions = Apollo.BaseMutationOptions<UpdateLabelMutation, UpdateLabelMutationVariables>;
export const UpdateLabelsOrdersDocument = gql`
    mutation UpdateLabelsOrders($labels: [OrderInput!]!, $boardId: String!) {
  updateLabelsOrders(labels: $labels, boardId: $boardId) {
    id
    name
    color
    board
  }
}
    `;
export type UpdateLabelsOrdersMutationFn = Apollo.MutationFunction<UpdateLabelsOrdersMutation, UpdateLabelsOrdersMutationVariables>;

/**
 * __useUpdateLabelsOrdersMutation__
 *
 * To run a mutation, you first call `useUpdateLabelsOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLabelsOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLabelsOrdersMutation, { data, loading, error }] = useUpdateLabelsOrdersMutation({
 *   variables: {
 *      labels: // value for 'labels'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useUpdateLabelsOrdersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLabelsOrdersMutation, UpdateLabelsOrdersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLabelsOrdersMutation, UpdateLabelsOrdersMutationVariables>(UpdateLabelsOrdersDocument, options);
      }
export type UpdateLabelsOrdersMutationHookResult = ReturnType<typeof useUpdateLabelsOrdersMutation>;
export type UpdateLabelsOrdersMutationResult = Apollo.MutationResult<UpdateLabelsOrdersMutation>;
export type UpdateLabelsOrdersMutationOptions = Apollo.BaseMutationOptions<UpdateLabelsOrdersMutation, UpdateLabelsOrdersMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($task: TaskInput!) {
  createTask(task: $task) {
    id
    order
    list
    title
    dueDate
    body
    subtasks {
      id
      order
      value
      checked
    }
    labels {
      id
      name
      color
    }
    complete
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: ID!) {
  deleteTask(taskId: $taskId)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetGroupedTasksDocument = gql`
    query GetGroupedTasks {
  getGroupedTasks {
    date
    tasks {
      id
      title
      body
      dueDate
      complete
      board {
        id
        name
      }
      list {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetGroupedTasksQuery__
 *
 * To run a query within a React component, call `useGetGroupedTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupedTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupedTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupedTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupedTasksQuery, GetGroupedTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupedTasksQuery, GetGroupedTasksQueryVariables>(GetGroupedTasksDocument, options);
      }
export function useGetGroupedTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupedTasksQuery, GetGroupedTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupedTasksQuery, GetGroupedTasksQueryVariables>(GetGroupedTasksDocument, options);
        }
export function useGetGroupedTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGroupedTasksQuery, GetGroupedTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupedTasksQuery, GetGroupedTasksQueryVariables>(GetGroupedTasksDocument, options);
        }
export type GetGroupedTasksQueryHookResult = ReturnType<typeof useGetGroupedTasksQuery>;
export type GetGroupedTasksLazyQueryHookResult = ReturnType<typeof useGetGroupedTasksLazyQuery>;
export type GetGroupedTasksSuspenseQueryHookResult = ReturnType<typeof useGetGroupedTasksSuspenseQuery>;
export type GetGroupedTasksQueryResult = Apollo.QueryResult<GetGroupedTasksQuery, GetGroupedTasksQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks($filters: [String], $labels: [String], $search: String, $boardId: ID!) {
  getTasks(filters: $filters, labels: $labels, search: $search, boardId: $boardId) {
    id
    title
    complete
    dueDate
    body
    list {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      labels: // value for 'labels'
 *      search: // value for 'search'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables> & ({ variables: GetTasksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const UpdateSubtaskDocument = gql`
    mutation UpdateSubtask($taskId: String, $subtaskId: String, $checked: Boolean) {
  updateSubtask(taskId: $taskId, subtaskId: $subtaskId, checked: $checked) {
    id
    order
    list
    title
    dueDate
    body
    subtasks {
      id
      order
      value
      checked
    }
    labels {
      id
      name
      color
    }
    complete
  }
}
    `;
export type UpdateSubtaskMutationFn = Apollo.MutationFunction<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>;

/**
 * __useUpdateSubtaskMutation__
 *
 * To run a mutation, you first call `useUpdateSubtaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubtaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubtaskMutation, { data, loading, error }] = useUpdateSubtaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      subtaskId: // value for 'subtaskId'
 *      checked: // value for 'checked'
 *   },
 * });
 */
export function useUpdateSubtaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>(UpdateSubtaskDocument, options);
      }
export type UpdateSubtaskMutationHookResult = ReturnType<typeof useUpdateSubtaskMutation>;
export type UpdateSubtaskMutationResult = Apollo.MutationResult<UpdateSubtaskMutation>;
export type UpdateSubtaskMutationOptions = Apollo.BaseMutationOptions<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($task: TaskUpdateInput!) {
  updateTask(task: $task) {
    id
    order
    list
    title
    dueDate
    body
    complete
    subtasks {
      id
      order
      value
      checked
    }
    labels {
      id
      name
      color
    }
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateTasksOrdersDocument = gql`
    mutation UpdateTasksOrders($tasks: [TaskUpdateInput!]!, $boardId: ID!) {
  updateTasksOrders(tasks: $tasks, boardId: $boardId) {
    id
    order
    name
    color
    board
  }
}
    `;
export type UpdateTasksOrdersMutationFn = Apollo.MutationFunction<UpdateTasksOrdersMutation, UpdateTasksOrdersMutationVariables>;

/**
 * __useUpdateTasksOrdersMutation__
 *
 * To run a mutation, you first call `useUpdateTasksOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTasksOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTasksOrdersMutation, { data, loading, error }] = useUpdateTasksOrdersMutation({
 *   variables: {
 *      tasks: // value for 'tasks'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useUpdateTasksOrdersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTasksOrdersMutation, UpdateTasksOrdersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTasksOrdersMutation, UpdateTasksOrdersMutationVariables>(UpdateTasksOrdersDocument, options);
      }
export type UpdateTasksOrdersMutationHookResult = ReturnType<typeof useUpdateTasksOrdersMutation>;
export type UpdateTasksOrdersMutationResult = Apollo.MutationResult<UpdateTasksOrdersMutation>;
export type UpdateTasksOrdersMutationOptions = Apollo.BaseMutationOptions<UpdateTasksOrdersMutation, UpdateTasksOrdersMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $name: String!, $password: String!) {
  createUser(email: $email, name: $name, password: $password) {
    id
    name
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateListDocument = gql`
    mutation CreateList($name: String!, $color: String!, $boardId: ID!) {
  createList(name: $name, color: $color, boardId: $boardId) {
    id
    order
    name
    color
    board
  }
}
    `;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const DeleteListDocument = gql`
    mutation DeleteList($id: ID!) {
  deleteList(id: $id)
}
    `;
export type DeleteListMutationFn = Apollo.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, options);
      }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const GetListsDocument = gql`
    query GetLists($boardId: ID!) {
  getLists(boardId: $boardId) {
    id
    order
    name
    color
    board
    items {
      id
      order
      title
      complete
      dueDate
      body
      list
      subtasks {
        id
        order
        value
        checked
      }
      labels {
        id
        name
        color
      }
    }
  }
}
    `;

/**
 * __useGetListsQuery__
 *
 * To run a query within a React component, call `useGetListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListsQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetListsQuery(baseOptions: Apollo.QueryHookOptions<GetListsQuery, GetListsQueryVariables> & ({ variables: GetListsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListsQuery, GetListsQueryVariables>(GetListsDocument, options);
      }
export function useGetListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListsQuery, GetListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListsQuery, GetListsQueryVariables>(GetListsDocument, options);
        }
export function useGetListsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetListsQuery, GetListsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListsQuery, GetListsQueryVariables>(GetListsDocument, options);
        }
export type GetListsQueryHookResult = ReturnType<typeof useGetListsQuery>;
export type GetListsLazyQueryHookResult = ReturnType<typeof useGetListsLazyQuery>;
export type GetListsSuspenseQueryHookResult = ReturnType<typeof useGetListsSuspenseQuery>;
export type GetListsQueryResult = Apollo.QueryResult<GetListsQuery, GetListsQueryVariables>;
export const UpdateListDocument = gql`
    mutation UpdateList($id: ID!, $name: String, $color: String, $boardId: ID!) {
  updateList(id: $id, name: $name, color: $color, boardId: $boardId) {
    id
    order
    name
    color
    board
  }
}
    `;
export type UpdateListMutationFn = Apollo.MutationFunction<UpdateListMutation, UpdateListMutationVariables>;

/**
 * __useUpdateListMutation__
 *
 * To run a mutation, you first call `useUpdateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListMutation, { data, loading, error }] = useUpdateListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useUpdateListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListMutation, UpdateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument, options);
      }
export type UpdateListMutationHookResult = ReturnType<typeof useUpdateListMutation>;
export type UpdateListMutationResult = Apollo.MutationResult<UpdateListMutation>;
export type UpdateListMutationOptions = Apollo.BaseMutationOptions<UpdateListMutation, UpdateListMutationVariables>;
export const UpdateListsOrdersDocument = gql`
    mutation UpdateListsOrders($lists: [OrderInput!]!, $boardId: String!) {
  updateListsOrders(lists: $lists, boardId: $boardId) {
    id
    order
    name
    color
    board
    items {
      id
      order
      title
      complete
      dueDate
      body
      list
    }
  }
}
    `;
export type UpdateListsOrdersMutationFn = Apollo.MutationFunction<UpdateListsOrdersMutation, UpdateListsOrdersMutationVariables>;

/**
 * __useUpdateListsOrdersMutation__
 *
 * To run a mutation, you first call `useUpdateListsOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListsOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListsOrdersMutation, { data, loading, error }] = useUpdateListsOrdersMutation({
 *   variables: {
 *      lists: // value for 'lists'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useUpdateListsOrdersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListsOrdersMutation, UpdateListsOrdersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListsOrdersMutation, UpdateListsOrdersMutationVariables>(UpdateListsOrdersDocument, options);
      }
export type UpdateListsOrdersMutationHookResult = ReturnType<typeof useUpdateListsOrdersMutation>;
export type UpdateListsOrdersMutationResult = Apollo.MutationResult<UpdateListsOrdersMutation>;
export type UpdateListsOrdersMutationOptions = Apollo.BaseMutationOptions<UpdateListsOrdersMutation, UpdateListsOrdersMutationVariables>;
export const DeleteBoardsGroupDocument = gql`
    mutation DeleteBoardsGroup($id: ID!) {
  deleteBoardsGroup(id: $id)
}
    `;
export type DeleteBoardsGroupMutationFn = Apollo.MutationFunction<DeleteBoardsGroupMutation, DeleteBoardsGroupMutationVariables>;

/**
 * __useDeleteBoardsGroupMutation__
 *
 * To run a mutation, you first call `useDeleteBoardsGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardsGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardsGroupMutation, { data, loading, error }] = useDeleteBoardsGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBoardsGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardsGroupMutation, DeleteBoardsGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardsGroupMutation, DeleteBoardsGroupMutationVariables>(DeleteBoardsGroupDocument, options);
      }
export type DeleteBoardsGroupMutationHookResult = ReturnType<typeof useDeleteBoardsGroupMutation>;
export type DeleteBoardsGroupMutationResult = Apollo.MutationResult<DeleteBoardsGroupMutation>;
export type DeleteBoardsGroupMutationOptions = Apollo.BaseMutationOptions<DeleteBoardsGroupMutation, DeleteBoardsGroupMutationVariables>;
export const UpdateBoardsGroupDocument = gql`
    mutation UpdateBoardsGroup($id: ID!, $name: String!) {
  updateBoardsGroup(id: $id, name: $name) {
    id
    name
    order
  }
}
    `;
export type UpdateBoardsGroupMutationFn = Apollo.MutationFunction<UpdateBoardsGroupMutation, UpdateBoardsGroupMutationVariables>;

/**
 * __useUpdateBoardsGroupMutation__
 *
 * To run a mutation, you first call `useUpdateBoardsGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardsGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardsGroupMutation, { data, loading, error }] = useUpdateBoardsGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateBoardsGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardsGroupMutation, UpdateBoardsGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardsGroupMutation, UpdateBoardsGroupMutationVariables>(UpdateBoardsGroupDocument, options);
      }
export type UpdateBoardsGroupMutationHookResult = ReturnType<typeof useUpdateBoardsGroupMutation>;
export type UpdateBoardsGroupMutationResult = Apollo.MutationResult<UpdateBoardsGroupMutation>;
export type UpdateBoardsGroupMutationOptions = Apollo.BaseMutationOptions<UpdateBoardsGroupMutation, UpdateBoardsGroupMutationVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Board: ResolverTypeWrapper<Board>;
  BoardInput: BoardInput;
  BoardsGroup: ResolverTypeWrapper<BoardsGroup>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  FullBoard: ResolverTypeWrapper<FullBoard>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Label: ResolverTypeWrapper<Label>;
  List: ResolverTypeWrapper<List>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  OrderInput: OrderInput;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subtask: ResolverTypeWrapper<Subtask>;
  SubtaskInput: SubtaskInput;
  Task: ResolverTypeWrapper<Task>;
  TaskGroup: ResolverTypeWrapper<TaskGroup>;
  TaskGroupByDate: ResolverTypeWrapper<TaskGroupByDate>;
  TaskInput: TaskInput;
  TaskUpdateInput: TaskUpdateInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Board: Board;
  BoardInput: BoardInput;
  BoardsGroup: BoardsGroup;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  FullBoard: FullBoard;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Label: Label;
  List: List;
  Mutation: Record<PropertyKey, never>;
  OrderInput: OrderInput;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Subtask: Subtask;
  SubtaskInput: SubtaskInput;
  Task: Task;
  TaskGroup: TaskGroup;
  TaskGroupByDate: TaskGroupByDate;
  TaskInput: TaskInput;
  TaskUpdateInput: TaskUpdateInput;
  User: User;
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  groupId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type BoardsGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoardsGroup'] = ResolversParentTypes['BoardsGroup']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FullBoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullBoard'] = ResolversParentTypes['FullBoard']> = {
  groupId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  listsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tasksCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type LabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  board?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  board?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'groupId' | 'name'>>;
  createBoardsGroup?: Resolver<ResolversTypes['BoardsGroup'], ParentType, ContextType, RequireFields<MutationCreateBoardsGroupArgs, 'name'>>;
  createLabel?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<MutationCreateLabelArgs, 'boardId' | 'color' | 'name'>>;
  createList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationCreateListArgs, 'boardId' | 'color' | 'name'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'task'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'name' | 'password'>>;
  deleteBoard?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  deleteBoardsGroup?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBoardsGroupArgs, 'id'>>;
  deleteLabel?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLabelArgs, 'id'>>;
  deleteList?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteListArgs, 'id'>>;
  deleteTask?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'taskId'>>;
  updateBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'id'>>;
  updateBoardsGroup?: Resolver<Maybe<ResolversTypes['BoardsGroup']>, ParentType, ContextType, RequireFields<MutationUpdateBoardsGroupArgs, 'id' | 'name'>>;
  updateBoardsOrders?: Resolver<Array<ResolversTypes['BoardsGroup']>, ParentType, ContextType, RequireFields<MutationUpdateBoardsOrdersArgs, 'boards'>>;
  updateLabel?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationUpdateLabelArgs, 'color' | 'id' | 'name'>>;
  updateLabelsOrders?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationUpdateLabelsOrdersArgs, 'boardId' | 'labels'>>;
  updateList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationUpdateListArgs, 'boardId' | 'id'>>;
  updateListsOrders?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationUpdateListsOrdersArgs, 'boardId' | 'lists'>>;
  updateSubtask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, Partial<MutationUpdateSubtaskArgs>>;
  updateTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'task'>>;
  updateTasksOrders?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationUpdateTasksOrdersArgs, 'boardId' | 'tasks'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBoard?: Resolver<Maybe<ResolversTypes['FullBoard']>, ParentType, ContextType, RequireFields<QueryGetBoardArgs, 'id'>>;
  getBoardsGroups?: Resolver<Array<ResolversTypes['BoardsGroup']>, ParentType, ContextType>;
  getGroupedTasks?: Resolver<Array<ResolversTypes['TaskGroupByDate']>, ParentType, ContextType>;
  getLabels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<QueryGetLabelsArgs, 'boardId'>>;
  getLists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryGetListsArgs, 'boardId'>>;
  getTasks?: Resolver<Array<ResolversTypes['TaskGroup']>, ParentType, ContextType, RequireFields<QueryGetTasksArgs, 'boardId'>>;
};

export type SubtaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subtask'] = ResolversParentTypes['Subtask']> = {
  checked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['Label']>>, ParentType, ContextType>;
  list?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subtasks?: Resolver<Maybe<Array<ResolversTypes['Subtask']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type TaskGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskGroup'] = ResolversParentTypes['TaskGroup']> = {
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  list?: Resolver<ResolversTypes['List'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TaskGroupByDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskGroupByDate'] = ResolversParentTypes['TaskGroupByDate']> = {
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['TaskGroup']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Board?: BoardResolvers<ContextType>;
  BoardsGroup?: BoardsGroupResolvers<ContextType>;
  Date?: GraphQLScalarType;
  FullBoard?: FullBoardResolvers<ContextType>;
  Label?: LabelResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subtask?: SubtaskResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskGroup?: TaskGroupResolvers<ContextType>;
  TaskGroupByDate?: TaskGroupByDateResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


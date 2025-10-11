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
  order?: Maybe<Scalars['Int']['output']>;
};

export type BoardInput = {
  groupId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type BoardsGroup = {
  __typename?: 'BoardsGroup';
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Board>>>;
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Int']['output']>;
};

export type Label = {
  __typename?: 'Label';
  board: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Int']['output']>;
};

export type List = {
  __typename?: 'List';
  board: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Task>>>;
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Int']['output']>;
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
  updateBoard: Board;
  updateBoardsGroup: BoardsGroup;
  updateBoardsOrders: Array<BoardsGroup>;
  updateLabel: Label;
  updateLabelsOrders: Array<Label>;
  updateList: List;
  updateListsOrders: Array<List>;
  updateSubtask: Task;
  updateTask: Task;
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
  board: Scalars['ID']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateListArgs = {
  board: Scalars['ID']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
  task?: InputMaybe<TaskInput>;
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
  labels: Array<OrderInput>;
};


export type MutationUpdateListArgs = {
  board?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateListsOrdersArgs = {
  lists: Array<OrderInput>;
};


export type MutationUpdateSubtaskArgs = {
  checked?: InputMaybe<Scalars['Boolean']['input']>;
  subtaskId?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTaskArgs = {
  task?: InputMaybe<TaskUpdateInput>;
};


export type MutationUpdateTasksOrdersArgs = {
  tasks?: InputMaybe<Array<InputMaybe<TaskUpdateInput>>>;
};

export type OrderInput = {
  id: Scalars['ID']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getBoard?: Maybe<Board>;
  getBoardsGroups: Array<BoardsGroup>;
  getGroupedTasks?: Maybe<Array<Maybe<TaskGroupByDate>>>;
  getLabels: Array<Label>;
  getLists: Array<List>;
  getTasks?: Maybe<Array<Maybe<TaskGroup>>>;
};


export type QueryGetBoardArgs = {
  board: Scalars['ID']['input'];
};


export type QueryGetLabelsArgs = {
  board: Scalars['ID']['input'];
};


export type QueryGetListsArgs = {
  board: Scalars['ID']['input'];
};


export type QueryGetTasksArgs = {
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  labels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Subtask = {
  __typename?: 'Subtask';
  checked?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
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
  complete?: Maybe<Scalars['Boolean']['output']>;
  dueDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  labels?: Maybe<Array<Maybe<Label>>>;
  list: Scalars['ID']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  subtasks?: Maybe<Array<Maybe<Subtask>>>;
  title: Scalars['String']['output'];
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
  subtasks?: InputMaybe<Array<InputMaybe<SubtaskInput>>>;
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
  subtasks?: InputMaybe<Array<InputMaybe<SubtaskInput>>>;
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


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', id: string, order?: number | null, name: string, groupId: string } };

export type CreateBoardsGroupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateBoardsGroupMutation = { __typename?: 'Mutation', createBoardsGroup: { __typename?: 'BoardsGroup', id: string, order?: number | null, name: string } };

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: string };


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
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type BoardsGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoardsGroup'] = ResolversParentTypes['BoardsGroup']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Board']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  board?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  board?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'groupId' | 'name'>>;
  createBoardsGroup?: Resolver<ResolversTypes['BoardsGroup'], ParentType, ContextType, RequireFields<MutationCreateBoardsGroupArgs, 'name'>>;
  createLabel?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<MutationCreateLabelArgs, 'board' | 'color' | 'name'>>;
  createList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationCreateListArgs, 'board' | 'color' | 'name'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationCreateTaskArgs>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'name' | 'password'>>;
  deleteBoard?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  deleteBoardsGroup?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBoardsGroupArgs, 'id'>>;
  deleteLabel?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLabelArgs, 'id'>>;
  deleteList?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteListArgs, 'id'>>;
  deleteTask?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'taskId'>>;
  updateBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'id'>>;
  updateBoardsGroup?: Resolver<ResolversTypes['BoardsGroup'], ParentType, ContextType, RequireFields<MutationUpdateBoardsGroupArgs, 'id' | 'name'>>;
  updateBoardsOrders?: Resolver<Array<ResolversTypes['BoardsGroup']>, ParentType, ContextType, RequireFields<MutationUpdateBoardsOrdersArgs, 'boards'>>;
  updateLabel?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<MutationUpdateLabelArgs, 'color' | 'id' | 'name'>>;
  updateLabelsOrders?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationUpdateLabelsOrdersArgs, 'labels'>>;
  updateList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationUpdateListArgs, 'id'>>;
  updateListsOrders?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationUpdateListsOrdersArgs, 'lists'>>;
  updateSubtask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationUpdateSubtaskArgs>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, Partial<MutationUpdateTaskArgs>>;
  updateTasksOrders?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, Partial<MutationUpdateTasksOrdersArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryGetBoardArgs, 'board'>>;
  getBoardsGroups?: Resolver<Array<ResolversTypes['BoardsGroup']>, ParentType, ContextType>;
  getGroupedTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaskGroupByDate']>>>, ParentType, ContextType>;
  getLabels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<QueryGetLabelsArgs, 'board'>>;
  getLists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryGetListsArgs, 'board'>>;
  getTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaskGroup']>>>, ParentType, ContextType, Partial<QueryGetTasksArgs>>;
};

export type SubtaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subtask'] = ResolversParentTypes['Subtask']> = {
  checked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<Maybe<ResolversTypes['Label']>>>, ParentType, ContextType>;
  list?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subtasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Subtask']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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


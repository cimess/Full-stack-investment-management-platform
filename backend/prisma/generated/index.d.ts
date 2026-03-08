
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model StockTable
 * 
 */
export type StockTable = $Result.DefaultSelection<Prisma.$StockTablePayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model Investment
 * 
 */
export type Investment = $Result.DefaultSelection<Prisma.$InvestmentPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Trade_request
 * 
 */
export type Trade_request = $Result.DefaultSelection<Prisma.$Trade_requestPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Manager
 * 
 */
export type Manager = $Result.DefaultSelection<Prisma.$ManagerPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Approved_Manager
 * 
 */
export type Approved_Manager = $Result.DefaultSelection<Prisma.$Approved_ManagerPayload>
/**
 * Model Approved_Admin
 * 
 */
export type Approved_Admin = $Result.DefaultSelection<Prisma.$Approved_AdminPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Roles: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MANAGER: 'MANAGER'
};

export type Roles = (typeof Roles)[keyof typeof Roles]


export const TransactionType: {
  BUY: 'BUY',
  SELL: 'SELL'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const Status: {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  FAILED: 'FAILED'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type Roles = $Enums.Roles

export const Roles: typeof $Enums.Roles

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockTable`: Exposes CRUD operations for the **StockTable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockTables
    * const stockTables = await prisma.stockTable.findMany()
    * ```
    */
  get stockTable(): Prisma.StockTableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.investment`: Exposes CRUD operations for the **Investment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Investments
    * const investments = await prisma.investment.findMany()
    * ```
    */
  get investment(): Prisma.InvestmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade_request`: Exposes CRUD operations for the **Trade_request** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trade_requests
    * const trade_requests = await prisma.trade_request.findMany()
    * ```
    */
  get trade_request(): Prisma.Trade_requestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.manager`: Exposes CRUD operations for the **Manager** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Managers
    * const managers = await prisma.manager.findMany()
    * ```
    */
  get manager(): Prisma.ManagerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approved_Manager`: Exposes CRUD operations for the **Approved_Manager** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Approved_Managers
    * const approved_Managers = await prisma.approved_Manager.findMany()
    * ```
    */
  get approved_Manager(): Prisma.Approved_ManagerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.approved_Admin`: Exposes CRUD operations for the **Approved_Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Approved_Admins
    * const approved_Admins = await prisma.approved_Admin.findMany()
    * ```
    */
  get approved_Admin(): Prisma.Approved_AdminDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    StockTable: 'StockTable',
    Portfolio: 'Portfolio',
    Investment: 'Investment',
    Transaction: 'Transaction',
    Trade_request: 'Trade_request',
    RefreshToken: 'RefreshToken',
    Manager: 'Manager',
    Admin: 'Admin',
    Approved_Manager: 'Approved_Manager',
    Approved_Admin: 'Approved_Admin'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "stockTable" | "portfolio" | "investment" | "transaction" | "trade_request" | "refreshToken" | "manager" | "admin" | "approved_Manager" | "approved_Admin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      StockTable: {
        payload: Prisma.$StockTablePayload<ExtArgs>
        fields: Prisma.StockTableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockTableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockTableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>
          }
          findFirst: {
            args: Prisma.StockTableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockTableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>
          }
          findMany: {
            args: Prisma.StockTableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>[]
          }
          create: {
            args: Prisma.StockTableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>
          }
          createMany: {
            args: Prisma.StockTableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockTableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>[]
          }
          delete: {
            args: Prisma.StockTableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>
          }
          update: {
            args: Prisma.StockTableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>
          }
          deleteMany: {
            args: Prisma.StockTableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockTableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockTableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>[]
          }
          upsert: {
            args: Prisma.StockTableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockTablePayload>
          }
          aggregate: {
            args: Prisma.StockTableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockTable>
          }
          groupBy: {
            args: Prisma.StockTableGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockTableGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockTableCountArgs<ExtArgs>
            result: $Utils.Optional<StockTableCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortfolioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
      Investment: {
        payload: Prisma.$InvestmentPayload<ExtArgs>
        fields: Prisma.InvestmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvestmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvestmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          findFirst: {
            args: Prisma.InvestmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvestmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          findMany: {
            args: Prisma.InvestmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          create: {
            args: Prisma.InvestmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          createMany: {
            args: Prisma.InvestmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvestmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          delete: {
            args: Prisma.InvestmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          update: {
            args: Prisma.InvestmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          deleteMany: {
            args: Prisma.InvestmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvestmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvestmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          upsert: {
            args: Prisma.InvestmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          aggregate: {
            args: Prisma.InvestmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvestment>
          }
          groupBy: {
            args: Prisma.InvestmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvestmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvestmentCountArgs<ExtArgs>
            result: $Utils.Optional<InvestmentCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Trade_request: {
        payload: Prisma.$Trade_requestPayload<ExtArgs>
        fields: Prisma.Trade_requestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Trade_requestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Trade_requestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>
          }
          findFirst: {
            args: Prisma.Trade_requestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Trade_requestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>
          }
          findMany: {
            args: Prisma.Trade_requestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>[]
          }
          create: {
            args: Prisma.Trade_requestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>
          }
          createMany: {
            args: Prisma.Trade_requestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Trade_requestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>[]
          }
          delete: {
            args: Prisma.Trade_requestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>
          }
          update: {
            args: Prisma.Trade_requestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>
          }
          deleteMany: {
            args: Prisma.Trade_requestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Trade_requestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Trade_requestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>[]
          }
          upsert: {
            args: Prisma.Trade_requestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Trade_requestPayload>
          }
          aggregate: {
            args: Prisma.Trade_requestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade_request>
          }
          groupBy: {
            args: Prisma.Trade_requestGroupByArgs<ExtArgs>
            result: $Utils.Optional<Trade_requestGroupByOutputType>[]
          }
          count: {
            args: Prisma.Trade_requestCountArgs<ExtArgs>
            result: $Utils.Optional<Trade_requestCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Manager: {
        payload: Prisma.$ManagerPayload<ExtArgs>
        fields: Prisma.ManagerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ManagerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ManagerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          findFirst: {
            args: Prisma.ManagerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ManagerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          findMany: {
            args: Prisma.ManagerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[]
          }
          create: {
            args: Prisma.ManagerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          createMany: {
            args: Prisma.ManagerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ManagerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[]
          }
          delete: {
            args: Prisma.ManagerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          update: {
            args: Prisma.ManagerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          deleteMany: {
            args: Prisma.ManagerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ManagerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ManagerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[]
          }
          upsert: {
            args: Prisma.ManagerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          aggregate: {
            args: Prisma.ManagerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateManager>
          }
          groupBy: {
            args: Prisma.ManagerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ManagerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ManagerCountArgs<ExtArgs>
            result: $Utils.Optional<ManagerCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Approved_Manager: {
        payload: Prisma.$Approved_ManagerPayload<ExtArgs>
        fields: Prisma.Approved_ManagerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Approved_ManagerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Approved_ManagerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>
          }
          findFirst: {
            args: Prisma.Approved_ManagerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Approved_ManagerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>
          }
          findMany: {
            args: Prisma.Approved_ManagerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>[]
          }
          create: {
            args: Prisma.Approved_ManagerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>
          }
          createMany: {
            args: Prisma.Approved_ManagerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Approved_ManagerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>[]
          }
          delete: {
            args: Prisma.Approved_ManagerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>
          }
          update: {
            args: Prisma.Approved_ManagerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>
          }
          deleteMany: {
            args: Prisma.Approved_ManagerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Approved_ManagerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Approved_ManagerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>[]
          }
          upsert: {
            args: Prisma.Approved_ManagerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_ManagerPayload>
          }
          aggregate: {
            args: Prisma.Approved_ManagerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApproved_Manager>
          }
          groupBy: {
            args: Prisma.Approved_ManagerGroupByArgs<ExtArgs>
            result: $Utils.Optional<Approved_ManagerGroupByOutputType>[]
          }
          count: {
            args: Prisma.Approved_ManagerCountArgs<ExtArgs>
            result: $Utils.Optional<Approved_ManagerCountAggregateOutputType> | number
          }
        }
      }
      Approved_Admin: {
        payload: Prisma.$Approved_AdminPayload<ExtArgs>
        fields: Prisma.Approved_AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Approved_AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Approved_AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>
          }
          findFirst: {
            args: Prisma.Approved_AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Approved_AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>
          }
          findMany: {
            args: Prisma.Approved_AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>[]
          }
          create: {
            args: Prisma.Approved_AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>
          }
          createMany: {
            args: Prisma.Approved_AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Approved_AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>[]
          }
          delete: {
            args: Prisma.Approved_AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>
          }
          update: {
            args: Prisma.Approved_AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>
          }
          deleteMany: {
            args: Prisma.Approved_AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Approved_AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Approved_AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>[]
          }
          upsert: {
            args: Prisma.Approved_AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Approved_AdminPayload>
          }
          aggregate: {
            args: Prisma.Approved_AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApproved_Admin>
          }
          groupBy: {
            args: Prisma.Approved_AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<Approved_AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.Approved_AdminCountArgs<ExtArgs>
            result: $Utils.Optional<Approved_AdminCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    stockTable?: StockTableOmit
    portfolio?: PortfolioOmit
    investment?: InvestmentOmit
    transaction?: TransactionOmit
    trade_request?: Trade_requestOmit
    refreshToken?: RefreshTokenOmit
    manager?: ManagerOmit
    admin?: AdminOmit
    approved_Manager?: Approved_ManagerOmit
    approved_Admin?: Approved_AdminOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    portfolio: number
    refreshToken: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | UserCountOutputTypeCountPortfolioArgs
    refreshToken?: boolean | UserCountOutputTypeCountRefreshTokenArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }


  /**
   * Count Type StockTableCountOutputType
   */

  export type StockTableCountOutputType = {
    investment: number
    transaction: number
    trade_request: number
  }

  export type StockTableCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investment?: boolean | StockTableCountOutputTypeCountInvestmentArgs
    transaction?: boolean | StockTableCountOutputTypeCountTransactionArgs
    trade_request?: boolean | StockTableCountOutputTypeCountTrade_requestArgs
  }

  // Custom InputTypes
  /**
   * StockTableCountOutputType without action
   */
  export type StockTableCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTableCountOutputType
     */
    select?: StockTableCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StockTableCountOutputType without action
   */
  export type StockTableCountOutputTypeCountInvestmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
  }

  /**
   * StockTableCountOutputType without action
   */
  export type StockTableCountOutputTypeCountTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * StockTableCountOutputType without action
   */
  export type StockTableCountOutputTypeCountTrade_requestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Trade_requestWhereInput
  }


  /**
   * Count Type PortfolioCountOutputType
   */

  export type PortfolioCountOutputType = {
    investment: number
    transaction: number
    trade_request: number
  }

  export type PortfolioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investment?: boolean | PortfolioCountOutputTypeCountInvestmentArgs
    transaction?: boolean | PortfolioCountOutputTypeCountTransactionArgs
    trade_request?: boolean | PortfolioCountOutputTypeCountTrade_requestArgs
  }

  // Custom InputTypes
  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioCountOutputType
     */
    select?: PortfolioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountInvestmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountTrade_requestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Trade_requestWhereInput
  }


  /**
   * Count Type ManagerCountOutputType
   */

  export type ManagerCountOutputType = {
    managed_by: number
    approvedBy: number
  }

  export type ManagerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    managed_by?: boolean | ManagerCountOutputTypeCountManaged_byArgs
    approvedBy?: boolean | ManagerCountOutputTypeCountApprovedByArgs
  }

  // Custom InputTypes
  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManagerCountOutputType
     */
    select?: ManagerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeCountManaged_byArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeCountApprovedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Trade_requestWhereInput
  }


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    admin_id: number
    super_admin_id: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin_id?: boolean | AdminCountOutputTypeCountAdmin_idArgs
    super_admin_id?: boolean | AdminCountOutputTypeCountSuper_admin_idArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountAdmin_idArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Approved_ManagerWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountSuper_admin_idArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Approved_AdminWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    fullname: string | null
    roles: $Enums.Roles | null
    createdAt: Date | null
    updatedAt: Date | null
    manager_id: string | null
    restricted: boolean | null
    isVerified: boolean | null
    verificationToken: string | null
    verificationTokenExpires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    fullname: string | null
    roles: $Enums.Roles | null
    createdAt: Date | null
    updatedAt: Date | null
    manager_id: string | null
    restricted: boolean | null
    isVerified: boolean | null
    verificationToken: string | null
    verificationTokenExpires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    fullname: number
    roles: number
    createdAt: number
    updatedAt: number
    manager_id: number
    restricted: number
    isVerified: number
    verificationToken: number
    verificationTokenExpires: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    fullname?: true
    roles?: true
    createdAt?: true
    updatedAt?: true
    manager_id?: true
    restricted?: true
    isVerified?: true
    verificationToken?: true
    verificationTokenExpires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    fullname?: true
    roles?: true
    createdAt?: true
    updatedAt?: true
    manager_id?: true
    restricted?: true
    isVerified?: true
    verificationToken?: true
    verificationTokenExpires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    fullname?: true
    roles?: true
    createdAt?: true
    updatedAt?: true
    manager_id?: true
    restricted?: true
    isVerified?: true
    verificationToken?: true
    verificationTokenExpires?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string
    password: string
    fullname: string
    roles: $Enums.Roles
    createdAt: Date
    updatedAt: Date
    manager_id: string | null
    restricted: boolean
    isVerified: boolean
    verificationToken: string | null
    verificationTokenExpires: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager_id?: boolean
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: boolean
    verificationTokenExpires?: boolean
    portfolio?: boolean | User$portfolioArgs<ExtArgs>
    refreshToken?: boolean | User$refreshTokenArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
    client_manager?: boolean | User$client_managerArgs<ExtArgs>
    to_admin?: boolean | User$to_adminArgs<ExtArgs>
    add_admin?: boolean | User$add_adminArgs<ExtArgs>
    Approved_Manager?: boolean | User$Approved_ManagerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager_id?: boolean
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: boolean
    verificationTokenExpires?: boolean
    client_manager?: boolean | User$client_managerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager_id?: boolean
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: boolean
    verificationTokenExpires?: boolean
    client_manager?: boolean | User$client_managerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager_id?: boolean
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: boolean
    verificationTokenExpires?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password" | "fullname" | "roles" | "createdAt" | "updatedAt" | "manager_id" | "restricted" | "isVerified" | "verificationToken" | "verificationTokenExpires", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | User$portfolioArgs<ExtArgs>
    refreshToken?: boolean | User$refreshTokenArgs<ExtArgs>
    manager?: boolean | User$managerArgs<ExtArgs>
    client_manager?: boolean | User$client_managerArgs<ExtArgs>
    to_admin?: boolean | User$to_adminArgs<ExtArgs>
    add_admin?: boolean | User$add_adminArgs<ExtArgs>
    Approved_Manager?: boolean | User$Approved_ManagerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client_manager?: boolean | User$client_managerArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client_manager?: boolean | User$client_managerArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>[]
      refreshToken: Prisma.$RefreshTokenPayload<ExtArgs>[]
      manager: Prisma.$ManagerPayload<ExtArgs> | null
      client_manager: Prisma.$ManagerPayload<ExtArgs> | null
      to_admin: Prisma.$AdminPayload<ExtArgs> | null
      add_admin: Prisma.$Approved_AdminPayload<ExtArgs> | null
      Approved_Manager: Prisma.$Approved_ManagerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      password: string
      fullname: string
      roles: $Enums.Roles
      createdAt: Date
      updatedAt: Date
      manager_id: string | null
      restricted: boolean
      isVerified: boolean
      verificationToken: string | null
      verificationTokenExpires: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends User$portfolioArgs<ExtArgs> = {}>(args?: Subset<T, User$portfolioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshToken<T extends User$refreshTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    manager<T extends User$managerArgs<ExtArgs> = {}>(args?: Subset<T, User$managerArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    client_manager<T extends User$client_managerArgs<ExtArgs> = {}>(args?: Subset<T, User$client_managerArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    to_admin<T extends User$to_adminArgs<ExtArgs> = {}>(args?: Subset<T, User$to_adminArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    add_admin<T extends User$add_adminArgs<ExtArgs> = {}>(args?: Subset<T, User$add_adminArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Approved_Manager<T extends User$Approved_ManagerArgs<ExtArgs> = {}>(args?: Subset<T, User$Approved_ManagerArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly fullname: FieldRef<"User", 'String'>
    readonly roles: FieldRef<"User", 'Roles'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly manager_id: FieldRef<"User", 'String'>
    readonly restricted: FieldRef<"User", 'Boolean'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly verificationToken: FieldRef<"User", 'String'>
    readonly verificationTokenExpires: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.portfolio
   */
  export type User$portfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * User.refreshToken
   */
  export type User$refreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.manager
   */
  export type User$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    where?: ManagerWhereInput
  }

  /**
   * User.client_manager
   */
  export type User$client_managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    where?: ManagerWhereInput
  }

  /**
   * User.to_admin
   */
  export type User$to_adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * User.add_admin
   */
  export type User$add_adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    where?: Approved_AdminWhereInput
  }

  /**
   * User.Approved_Manager
   */
  export type User$Approved_ManagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    where?: Approved_ManagerWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model StockTable
   */

  export type AggregateStockTable = {
    _count: StockTableCountAggregateOutputType | null
    _avg: StockTableAvgAggregateOutputType | null
    _sum: StockTableSumAggregateOutputType | null
    _min: StockTableMinAggregateOutputType | null
    _max: StockTableMaxAggregateOutputType | null
  }

  export type StockTableAvgAggregateOutputType = {
    price: Decimal | null
    changePercent: Decimal | null
    marketCap: number | null
    peRatio: Decimal | null
    dividendYield: Decimal | null
    fiftyTwoWeekLow: Decimal | null
    fiftyTwoWeekHigh: Decimal | null
  }

  export type StockTableSumAggregateOutputType = {
    price: Decimal | null
    changePercent: Decimal | null
    marketCap: bigint | null
    peRatio: Decimal | null
    dividendYield: Decimal | null
    fiftyTwoWeekLow: Decimal | null
    fiftyTwoWeekHigh: Decimal | null
  }

  export type StockTableMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    company: string | null
    price: Decimal | null
    changePercent: Decimal | null
    marketCap: bigint | null
    volume: string | null
    peRatio: Decimal | null
    dividendYield: Decimal | null
    fiftyTwoWeekLow: Decimal | null
    fiftyTwoWeekHigh: Decimal | null
    currency: string | null
    exchange: string | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockTableMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    company: string | null
    price: Decimal | null
    changePercent: Decimal | null
    marketCap: bigint | null
    volume: string | null
    peRatio: Decimal | null
    dividendYield: Decimal | null
    fiftyTwoWeekLow: Decimal | null
    fiftyTwoWeekHigh: Decimal | null
    currency: string | null
    exchange: string | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockTableCountAggregateOutputType = {
    id: number
    symbol: number
    company: number
    price: number
    changePercent: number
    marketCap: number
    volume: number
    peRatio: number
    dividendYield: number
    fiftyTwoWeekLow: number
    fiftyTwoWeekHigh: number
    currency: number
    exchange: number
    lastUpdated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockTableAvgAggregateInputType = {
    price?: true
    changePercent?: true
    marketCap?: true
    peRatio?: true
    dividendYield?: true
    fiftyTwoWeekLow?: true
    fiftyTwoWeekHigh?: true
  }

  export type StockTableSumAggregateInputType = {
    price?: true
    changePercent?: true
    marketCap?: true
    peRatio?: true
    dividendYield?: true
    fiftyTwoWeekLow?: true
    fiftyTwoWeekHigh?: true
  }

  export type StockTableMinAggregateInputType = {
    id?: true
    symbol?: true
    company?: true
    price?: true
    changePercent?: true
    marketCap?: true
    volume?: true
    peRatio?: true
    dividendYield?: true
    fiftyTwoWeekLow?: true
    fiftyTwoWeekHigh?: true
    currency?: true
    exchange?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockTableMaxAggregateInputType = {
    id?: true
    symbol?: true
    company?: true
    price?: true
    changePercent?: true
    marketCap?: true
    volume?: true
    peRatio?: true
    dividendYield?: true
    fiftyTwoWeekLow?: true
    fiftyTwoWeekHigh?: true
    currency?: true
    exchange?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockTableCountAggregateInputType = {
    id?: true
    symbol?: true
    company?: true
    price?: true
    changePercent?: true
    marketCap?: true
    volume?: true
    peRatio?: true
    dividendYield?: true
    fiftyTwoWeekLow?: true
    fiftyTwoWeekHigh?: true
    currency?: true
    exchange?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockTableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockTable to aggregate.
     */
    where?: StockTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTables to fetch.
     */
    orderBy?: StockTableOrderByWithRelationInput | StockTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockTables
    **/
    _count?: true | StockTableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockTableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockTableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockTableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockTableMaxAggregateInputType
  }

  export type GetStockTableAggregateType<T extends StockTableAggregateArgs> = {
        [P in keyof T & keyof AggregateStockTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockTable[P]>
      : GetScalarType<T[P], AggregateStockTable[P]>
  }




  export type StockTableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockTableWhereInput
    orderBy?: StockTableOrderByWithAggregationInput | StockTableOrderByWithAggregationInput[]
    by: StockTableScalarFieldEnum[] | StockTableScalarFieldEnum
    having?: StockTableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockTableCountAggregateInputType | true
    _avg?: StockTableAvgAggregateInputType
    _sum?: StockTableSumAggregateInputType
    _min?: StockTableMinAggregateInputType
    _max?: StockTableMaxAggregateInputType
  }

  export type StockTableGroupByOutputType = {
    id: string
    symbol: string
    company: string
    price: Decimal
    changePercent: Decimal | null
    marketCap: bigint | null
    volume: string | null
    peRatio: Decimal | null
    dividendYield: Decimal | null
    fiftyTwoWeekLow: Decimal | null
    fiftyTwoWeekHigh: Decimal | null
    currency: string
    exchange: string | null
    lastUpdated: Date | null
    createdAt: Date
    updatedAt: Date
    _count: StockTableCountAggregateOutputType | null
    _avg: StockTableAvgAggregateOutputType | null
    _sum: StockTableSumAggregateOutputType | null
    _min: StockTableMinAggregateOutputType | null
    _max: StockTableMaxAggregateOutputType | null
  }

  type GetStockTableGroupByPayload<T extends StockTableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockTableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockTableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockTableGroupByOutputType[P]>
            : GetScalarType<T[P], StockTableGroupByOutputType[P]>
        }
      >
    >


  export type StockTableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    company?: boolean
    price?: boolean
    changePercent?: boolean
    marketCap?: boolean
    volume?: boolean
    peRatio?: boolean
    dividendYield?: boolean
    fiftyTwoWeekLow?: boolean
    fiftyTwoWeekHigh?: boolean
    currency?: boolean
    exchange?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    investment?: boolean | StockTable$investmentArgs<ExtArgs>
    transaction?: boolean | StockTable$transactionArgs<ExtArgs>
    trade_request?: boolean | StockTable$trade_requestArgs<ExtArgs>
    _count?: boolean | StockTableCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockTable"]>

  export type StockTableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    company?: boolean
    price?: boolean
    changePercent?: boolean
    marketCap?: boolean
    volume?: boolean
    peRatio?: boolean
    dividendYield?: boolean
    fiftyTwoWeekLow?: boolean
    fiftyTwoWeekHigh?: boolean
    currency?: boolean
    exchange?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stockTable"]>

  export type StockTableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    company?: boolean
    price?: boolean
    changePercent?: boolean
    marketCap?: boolean
    volume?: boolean
    peRatio?: boolean
    dividendYield?: boolean
    fiftyTwoWeekLow?: boolean
    fiftyTwoWeekHigh?: boolean
    currency?: boolean
    exchange?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stockTable"]>

  export type StockTableSelectScalar = {
    id?: boolean
    symbol?: boolean
    company?: boolean
    price?: boolean
    changePercent?: boolean
    marketCap?: boolean
    volume?: boolean
    peRatio?: boolean
    dividendYield?: boolean
    fiftyTwoWeekLow?: boolean
    fiftyTwoWeekHigh?: boolean
    currency?: boolean
    exchange?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockTableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "company" | "price" | "changePercent" | "marketCap" | "volume" | "peRatio" | "dividendYield" | "fiftyTwoWeekLow" | "fiftyTwoWeekHigh" | "currency" | "exchange" | "lastUpdated" | "createdAt" | "updatedAt", ExtArgs["result"]["stockTable"]>
  export type StockTableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investment?: boolean | StockTable$investmentArgs<ExtArgs>
    transaction?: boolean | StockTable$transactionArgs<ExtArgs>
    trade_request?: boolean | StockTable$trade_requestArgs<ExtArgs>
    _count?: boolean | StockTableCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StockTableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StockTableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StockTablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockTable"
    objects: {
      investment: Prisma.$InvestmentPayload<ExtArgs>[]
      transaction: Prisma.$TransactionPayload<ExtArgs>[]
      trade_request: Prisma.$Trade_requestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      company: string
      price: Prisma.Decimal
      changePercent: Prisma.Decimal | null
      marketCap: bigint | null
      volume: string | null
      peRatio: Prisma.Decimal | null
      dividendYield: Prisma.Decimal | null
      fiftyTwoWeekLow: Prisma.Decimal | null
      fiftyTwoWeekHigh: Prisma.Decimal | null
      currency: string
      exchange: string | null
      lastUpdated: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stockTable"]>
    composites: {}
  }

  type StockTableGetPayload<S extends boolean | null | undefined | StockTableDefaultArgs> = $Result.GetResult<Prisma.$StockTablePayload, S>

  type StockTableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockTableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockTableCountAggregateInputType | true
    }

  export interface StockTableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockTable'], meta: { name: 'StockTable' } }
    /**
     * Find zero or one StockTable that matches the filter.
     * @param {StockTableFindUniqueArgs} args - Arguments to find a StockTable
     * @example
     * // Get one StockTable
     * const stockTable = await prisma.stockTable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockTableFindUniqueArgs>(args: SelectSubset<T, StockTableFindUniqueArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockTable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockTableFindUniqueOrThrowArgs} args - Arguments to find a StockTable
     * @example
     * // Get one StockTable
     * const stockTable = await prisma.stockTable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockTableFindUniqueOrThrowArgs>(args: SelectSubset<T, StockTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockTable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTableFindFirstArgs} args - Arguments to find a StockTable
     * @example
     * // Get one StockTable
     * const stockTable = await prisma.stockTable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockTableFindFirstArgs>(args?: SelectSubset<T, StockTableFindFirstArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockTable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTableFindFirstOrThrowArgs} args - Arguments to find a StockTable
     * @example
     * // Get one StockTable
     * const stockTable = await prisma.stockTable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockTableFindFirstOrThrowArgs>(args?: SelectSubset<T, StockTableFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockTables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockTables
     * const stockTables = await prisma.stockTable.findMany()
     * 
     * // Get first 10 StockTables
     * const stockTables = await prisma.stockTable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockTableWithIdOnly = await prisma.stockTable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockTableFindManyArgs>(args?: SelectSubset<T, StockTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockTable.
     * @param {StockTableCreateArgs} args - Arguments to create a StockTable.
     * @example
     * // Create one StockTable
     * const StockTable = await prisma.stockTable.create({
     *   data: {
     *     // ... data to create a StockTable
     *   }
     * })
     * 
     */
    create<T extends StockTableCreateArgs>(args: SelectSubset<T, StockTableCreateArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockTables.
     * @param {StockTableCreateManyArgs} args - Arguments to create many StockTables.
     * @example
     * // Create many StockTables
     * const stockTable = await prisma.stockTable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockTableCreateManyArgs>(args?: SelectSubset<T, StockTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockTables and returns the data saved in the database.
     * @param {StockTableCreateManyAndReturnArgs} args - Arguments to create many StockTables.
     * @example
     * // Create many StockTables
     * const stockTable = await prisma.stockTable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockTables and only return the `id`
     * const stockTableWithIdOnly = await prisma.stockTable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockTableCreateManyAndReturnArgs>(args?: SelectSubset<T, StockTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockTable.
     * @param {StockTableDeleteArgs} args - Arguments to delete one StockTable.
     * @example
     * // Delete one StockTable
     * const StockTable = await prisma.stockTable.delete({
     *   where: {
     *     // ... filter to delete one StockTable
     *   }
     * })
     * 
     */
    delete<T extends StockTableDeleteArgs>(args: SelectSubset<T, StockTableDeleteArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockTable.
     * @param {StockTableUpdateArgs} args - Arguments to update one StockTable.
     * @example
     * // Update one StockTable
     * const stockTable = await prisma.stockTable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockTableUpdateArgs>(args: SelectSubset<T, StockTableUpdateArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockTables.
     * @param {StockTableDeleteManyArgs} args - Arguments to filter StockTables to delete.
     * @example
     * // Delete a few StockTables
     * const { count } = await prisma.stockTable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockTableDeleteManyArgs>(args?: SelectSubset<T, StockTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockTables
     * const stockTable = await prisma.stockTable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockTableUpdateManyArgs>(args: SelectSubset<T, StockTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockTables and returns the data updated in the database.
     * @param {StockTableUpdateManyAndReturnArgs} args - Arguments to update many StockTables.
     * @example
     * // Update many StockTables
     * const stockTable = await prisma.stockTable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockTables and only return the `id`
     * const stockTableWithIdOnly = await prisma.stockTable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockTableUpdateManyAndReturnArgs>(args: SelectSubset<T, StockTableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockTable.
     * @param {StockTableUpsertArgs} args - Arguments to update or create a StockTable.
     * @example
     * // Update or create a StockTable
     * const stockTable = await prisma.stockTable.upsert({
     *   create: {
     *     // ... data to create a StockTable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockTable we want to update
     *   }
     * })
     */
    upsert<T extends StockTableUpsertArgs>(args: SelectSubset<T, StockTableUpsertArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTableCountArgs} args - Arguments to filter StockTables to count.
     * @example
     * // Count the number of StockTables
     * const count = await prisma.stockTable.count({
     *   where: {
     *     // ... the filter for the StockTables we want to count
     *   }
     * })
    **/
    count<T extends StockTableCountArgs>(
      args?: Subset<T, StockTableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockTableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockTableAggregateArgs>(args: Subset<T, StockTableAggregateArgs>): Prisma.PrismaPromise<GetStockTableAggregateType<T>>

    /**
     * Group by StockTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockTableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockTableGroupByArgs['orderBy'] }
        : { orderBy?: StockTableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockTable model
   */
  readonly fields: StockTableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockTable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockTableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    investment<T extends StockTable$investmentArgs<ExtArgs> = {}>(args?: Subset<T, StockTable$investmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transaction<T extends StockTable$transactionArgs<ExtArgs> = {}>(args?: Subset<T, StockTable$transactionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trade_request<T extends StockTable$trade_requestArgs<ExtArgs> = {}>(args?: Subset<T, StockTable$trade_requestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockTable model
   */
  interface StockTableFieldRefs {
    readonly id: FieldRef<"StockTable", 'String'>
    readonly symbol: FieldRef<"StockTable", 'String'>
    readonly company: FieldRef<"StockTable", 'String'>
    readonly price: FieldRef<"StockTable", 'Decimal'>
    readonly changePercent: FieldRef<"StockTable", 'Decimal'>
    readonly marketCap: FieldRef<"StockTable", 'BigInt'>
    readonly volume: FieldRef<"StockTable", 'String'>
    readonly peRatio: FieldRef<"StockTable", 'Decimal'>
    readonly dividendYield: FieldRef<"StockTable", 'Decimal'>
    readonly fiftyTwoWeekLow: FieldRef<"StockTable", 'Decimal'>
    readonly fiftyTwoWeekHigh: FieldRef<"StockTable", 'Decimal'>
    readonly currency: FieldRef<"StockTable", 'String'>
    readonly exchange: FieldRef<"StockTable", 'String'>
    readonly lastUpdated: FieldRef<"StockTable", 'DateTime'>
    readonly createdAt: FieldRef<"StockTable", 'DateTime'>
    readonly updatedAt: FieldRef<"StockTable", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockTable findUnique
   */
  export type StockTableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * Filter, which StockTable to fetch.
     */
    where: StockTableWhereUniqueInput
  }

  /**
   * StockTable findUniqueOrThrow
   */
  export type StockTableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * Filter, which StockTable to fetch.
     */
    where: StockTableWhereUniqueInput
  }

  /**
   * StockTable findFirst
   */
  export type StockTableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * Filter, which StockTable to fetch.
     */
    where?: StockTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTables to fetch.
     */
    orderBy?: StockTableOrderByWithRelationInput | StockTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockTables.
     */
    cursor?: StockTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockTables.
     */
    distinct?: StockTableScalarFieldEnum | StockTableScalarFieldEnum[]
  }

  /**
   * StockTable findFirstOrThrow
   */
  export type StockTableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * Filter, which StockTable to fetch.
     */
    where?: StockTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTables to fetch.
     */
    orderBy?: StockTableOrderByWithRelationInput | StockTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockTables.
     */
    cursor?: StockTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockTables.
     */
    distinct?: StockTableScalarFieldEnum | StockTableScalarFieldEnum[]
  }

  /**
   * StockTable findMany
   */
  export type StockTableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * Filter, which StockTables to fetch.
     */
    where?: StockTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockTables to fetch.
     */
    orderBy?: StockTableOrderByWithRelationInput | StockTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockTables.
     */
    cursor?: StockTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockTables.
     */
    skip?: number
    distinct?: StockTableScalarFieldEnum | StockTableScalarFieldEnum[]
  }

  /**
   * StockTable create
   */
  export type StockTableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * The data needed to create a StockTable.
     */
    data: XOR<StockTableCreateInput, StockTableUncheckedCreateInput>
  }

  /**
   * StockTable createMany
   */
  export type StockTableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockTables.
     */
    data: StockTableCreateManyInput | StockTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockTable createManyAndReturn
   */
  export type StockTableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * The data used to create many StockTables.
     */
    data: StockTableCreateManyInput | StockTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockTable update
   */
  export type StockTableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * The data needed to update a StockTable.
     */
    data: XOR<StockTableUpdateInput, StockTableUncheckedUpdateInput>
    /**
     * Choose, which StockTable to update.
     */
    where: StockTableWhereUniqueInput
  }

  /**
   * StockTable updateMany
   */
  export type StockTableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockTables.
     */
    data: XOR<StockTableUpdateManyMutationInput, StockTableUncheckedUpdateManyInput>
    /**
     * Filter which StockTables to update
     */
    where?: StockTableWhereInput
    /**
     * Limit how many StockTables to update.
     */
    limit?: number
  }

  /**
   * StockTable updateManyAndReturn
   */
  export type StockTableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * The data used to update StockTables.
     */
    data: XOR<StockTableUpdateManyMutationInput, StockTableUncheckedUpdateManyInput>
    /**
     * Filter which StockTables to update
     */
    where?: StockTableWhereInput
    /**
     * Limit how many StockTables to update.
     */
    limit?: number
  }

  /**
   * StockTable upsert
   */
  export type StockTableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * The filter to search for the StockTable to update in case it exists.
     */
    where: StockTableWhereUniqueInput
    /**
     * In case the StockTable found by the `where` argument doesn't exist, create a new StockTable with this data.
     */
    create: XOR<StockTableCreateInput, StockTableUncheckedCreateInput>
    /**
     * In case the StockTable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockTableUpdateInput, StockTableUncheckedUpdateInput>
  }

  /**
   * StockTable delete
   */
  export type StockTableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
    /**
     * Filter which StockTable to delete.
     */
    where: StockTableWhereUniqueInput
  }

  /**
   * StockTable deleteMany
   */
  export type StockTableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockTables to delete
     */
    where?: StockTableWhereInput
    /**
     * Limit how many StockTables to delete.
     */
    limit?: number
  }

  /**
   * StockTable.investment
   */
  export type StockTable$investmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    cursor?: InvestmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * StockTable.transaction
   */
  export type StockTable$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * StockTable.trade_request
   */
  export type StockTable$trade_requestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    where?: Trade_requestWhereInput
    orderBy?: Trade_requestOrderByWithRelationInput | Trade_requestOrderByWithRelationInput[]
    cursor?: Trade_requestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Trade_requestScalarFieldEnum | Trade_requestScalarFieldEnum[]
  }

  /**
   * StockTable without action
   */
  export type StockTableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTable
     */
    select?: StockTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockTable
     */
    omit?: StockTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockTableInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    user_id: string | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    user_id: number
    _all: number
  }


  export type PortfolioMinAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    user_id?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    user_id: string
    _count: PortfolioCountAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    investment?: boolean | Portfolio$investmentArgs<ExtArgs>
    transaction?: boolean | Portfolio$transactionArgs<ExtArgs>
    trade_request?: boolean | Portfolio$trade_requestArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectScalar = {
    id?: boolean
    user_id?: boolean
  }

  export type PortfolioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id", ExtArgs["result"]["portfolio"]>
  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    investment?: boolean | Portfolio$investmentArgs<ExtArgs>
    transaction?: boolean | Portfolio$transactionArgs<ExtArgs>
    trade_request?: boolean | Portfolio$trade_requestArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      investment: Prisma.$InvestmentPayload<ExtArgs>[]
      transaction: Prisma.$TransactionPayload<ExtArgs>[]
      trade_request: Prisma.$Trade_requestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portfolios and returns the data saved in the database.
     * @param {PortfolioCreateManyAndReturnArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios and returns the data updated in the database.
     * @param {PortfolioUpdateManyAndReturnArgs} args - Arguments to update many Portfolios.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortfolioUpdateManyAndReturnArgs>(args: SelectSubset<T, PortfolioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    investment<T extends Portfolio$investmentArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$investmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transaction<T extends Portfolio$transactionArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$transactionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trade_request<T extends Portfolio$trade_requestArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$trade_requestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio model
   */
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly user_id: FieldRef<"Portfolio", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Portfolio createManyAndReturn
   */
  export type PortfolioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
  }

  /**
   * Portfolio updateManyAndReturn
   */
  export type PortfolioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to delete.
     */
    limit?: number
  }

  /**
   * Portfolio.investment
   */
  export type Portfolio$investmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    cursor?: InvestmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Portfolio.transaction
   */
  export type Portfolio$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Portfolio.trade_request
   */
  export type Portfolio$trade_requestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    where?: Trade_requestWhereInput
    orderBy?: Trade_requestOrderByWithRelationInput | Trade_requestOrderByWithRelationInput[]
    cursor?: Trade_requestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Trade_requestScalarFieldEnum | Trade_requestScalarFieldEnum[]
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Model Investment
   */

  export type AggregateInvestment = {
    _count: InvestmentCountAggregateOutputType | null
    _avg: InvestmentAvgAggregateOutputType | null
    _sum: InvestmentSumAggregateOutputType | null
    _min: InvestmentMinAggregateOutputType | null
    _max: InvestmentMaxAggregateOutputType | null
  }

  export type InvestmentAvgAggregateOutputType = {
    quantity: number | null
    avgPrice: Decimal | null
  }

  export type InvestmentSumAggregateOutputType = {
    quantity: number | null
    avgPrice: Decimal | null
  }

  export type InvestmentMinAggregateOutputType = {
    id: string | null
    portfolio_id: string | null
    stock_id: string | null
    quantity: number | null
    avgPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvestmentMaxAggregateOutputType = {
    id: string | null
    portfolio_id: string | null
    stock_id: string | null
    quantity: number | null
    avgPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvestmentCountAggregateOutputType = {
    id: number
    portfolio_id: number
    stock_id: number
    quantity: number
    avgPrice: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvestmentAvgAggregateInputType = {
    quantity?: true
    avgPrice?: true
  }

  export type InvestmentSumAggregateInputType = {
    quantity?: true
    avgPrice?: true
  }

  export type InvestmentMinAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    avgPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvestmentMaxAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    avgPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvestmentCountAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    avgPrice?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvestmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investment to aggregate.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Investments
    **/
    _count?: true | InvestmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvestmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvestmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvestmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvestmentMaxAggregateInputType
  }

  export type GetInvestmentAggregateType<T extends InvestmentAggregateArgs> = {
        [P in keyof T & keyof AggregateInvestment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestment[P]>
      : GetScalarType<T[P], AggregateInvestment[P]>
  }




  export type InvestmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithAggregationInput | InvestmentOrderByWithAggregationInput[]
    by: InvestmentScalarFieldEnum[] | InvestmentScalarFieldEnum
    having?: InvestmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvestmentCountAggregateInputType | true
    _avg?: InvestmentAvgAggregateInputType
    _sum?: InvestmentSumAggregateInputType
    _min?: InvestmentMinAggregateInputType
    _max?: InvestmentMaxAggregateInputType
  }

  export type InvestmentGroupByOutputType = {
    id: string
    portfolio_id: string
    stock_id: string
    quantity: number
    avgPrice: Decimal
    createdAt: Date
    updatedAt: Date
    _count: InvestmentCountAggregateOutputType | null
    _avg: InvestmentAvgAggregateOutputType | null
    _sum: InvestmentSumAggregateOutputType | null
    _min: InvestmentMinAggregateOutputType | null
    _max: InvestmentMaxAggregateOutputType | null
  }

  type GetInvestmentGroupByPayload<T extends InvestmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvestmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvestmentGroupByOutputType[P]>
            : GetScalarType<T[P], InvestmentGroupByOutputType[P]>
        }
      >
    >


  export type InvestmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    avgPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    avgPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    avgPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectScalar = {
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    avgPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvestmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "portfolio_id" | "stock_id" | "quantity" | "avgPrice" | "createdAt" | "updatedAt", ExtArgs["result"]["investment"]>
  export type InvestmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }
  export type InvestmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }
  export type InvestmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }

  export type $InvestmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Investment"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
      stock: Prisma.$StockTablePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      portfolio_id: string
      stock_id: string
      quantity: number
      avgPrice: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["investment"]>
    composites: {}
  }

  type InvestmentGetPayload<S extends boolean | null | undefined | InvestmentDefaultArgs> = $Result.GetResult<Prisma.$InvestmentPayload, S>

  type InvestmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvestmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvestmentCountAggregateInputType | true
    }

  export interface InvestmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Investment'], meta: { name: 'Investment' } }
    /**
     * Find zero or one Investment that matches the filter.
     * @param {InvestmentFindUniqueArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvestmentFindUniqueArgs>(args: SelectSubset<T, InvestmentFindUniqueArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Investment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvestmentFindUniqueOrThrowArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvestmentFindUniqueOrThrowArgs>(args: SelectSubset<T, InvestmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindFirstArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvestmentFindFirstArgs>(args?: SelectSubset<T, InvestmentFindFirstArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindFirstOrThrowArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvestmentFindFirstOrThrowArgs>(args?: SelectSubset<T, InvestmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Investments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investments
     * const investments = await prisma.investment.findMany()
     * 
     * // Get first 10 Investments
     * const investments = await prisma.investment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const investmentWithIdOnly = await prisma.investment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvestmentFindManyArgs>(args?: SelectSubset<T, InvestmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Investment.
     * @param {InvestmentCreateArgs} args - Arguments to create a Investment.
     * @example
     * // Create one Investment
     * const Investment = await prisma.investment.create({
     *   data: {
     *     // ... data to create a Investment
     *   }
     * })
     * 
     */
    create<T extends InvestmentCreateArgs>(args: SelectSubset<T, InvestmentCreateArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Investments.
     * @param {InvestmentCreateManyArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investment = await prisma.investment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvestmentCreateManyArgs>(args?: SelectSubset<T, InvestmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Investments and returns the data saved in the database.
     * @param {InvestmentCreateManyAndReturnArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investment = await prisma.investment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Investments and only return the `id`
     * const investmentWithIdOnly = await prisma.investment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvestmentCreateManyAndReturnArgs>(args?: SelectSubset<T, InvestmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Investment.
     * @param {InvestmentDeleteArgs} args - Arguments to delete one Investment.
     * @example
     * // Delete one Investment
     * const Investment = await prisma.investment.delete({
     *   where: {
     *     // ... filter to delete one Investment
     *   }
     * })
     * 
     */
    delete<T extends InvestmentDeleteArgs>(args: SelectSubset<T, InvestmentDeleteArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Investment.
     * @param {InvestmentUpdateArgs} args - Arguments to update one Investment.
     * @example
     * // Update one Investment
     * const investment = await prisma.investment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvestmentUpdateArgs>(args: SelectSubset<T, InvestmentUpdateArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Investments.
     * @param {InvestmentDeleteManyArgs} args - Arguments to filter Investments to delete.
     * @example
     * // Delete a few Investments
     * const { count } = await prisma.investment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvestmentDeleteManyArgs>(args?: SelectSubset<T, InvestmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investments
     * const investment = await prisma.investment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvestmentUpdateManyArgs>(args: SelectSubset<T, InvestmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments and returns the data updated in the database.
     * @param {InvestmentUpdateManyAndReturnArgs} args - Arguments to update many Investments.
     * @example
     * // Update many Investments
     * const investment = await prisma.investment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Investments and only return the `id`
     * const investmentWithIdOnly = await prisma.investment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvestmentUpdateManyAndReturnArgs>(args: SelectSubset<T, InvestmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Investment.
     * @param {InvestmentUpsertArgs} args - Arguments to update or create a Investment.
     * @example
     * // Update or create a Investment
     * const investment = await prisma.investment.upsert({
     *   create: {
     *     // ... data to create a Investment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investment we want to update
     *   }
     * })
     */
    upsert<T extends InvestmentUpsertArgs>(args: SelectSubset<T, InvestmentUpsertArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentCountArgs} args - Arguments to filter Investments to count.
     * @example
     * // Count the number of Investments
     * const count = await prisma.investment.count({
     *   where: {
     *     // ... the filter for the Investments we want to count
     *   }
     * })
    **/
    count<T extends InvestmentCountArgs>(
      args?: Subset<T, InvestmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvestmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Investment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvestmentAggregateArgs>(args: Subset<T, InvestmentAggregateArgs>): Prisma.PrismaPromise<GetInvestmentAggregateType<T>>

    /**
     * Group by Investment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvestmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvestmentGroupByArgs['orderBy'] }
        : { orderBy?: InvestmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvestmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Investment model
   */
  readonly fields: InvestmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Investment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvestmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends StockTableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockTableDefaultArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Investment model
   */
  interface InvestmentFieldRefs {
    readonly id: FieldRef<"Investment", 'String'>
    readonly portfolio_id: FieldRef<"Investment", 'String'>
    readonly stock_id: FieldRef<"Investment", 'String'>
    readonly quantity: FieldRef<"Investment", 'Int'>
    readonly avgPrice: FieldRef<"Investment", 'Decimal'>
    readonly createdAt: FieldRef<"Investment", 'DateTime'>
    readonly updatedAt: FieldRef<"Investment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Investment findUnique
   */
  export type InvestmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment findUniqueOrThrow
   */
  export type InvestmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment findFirst
   */
  export type InvestmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investments.
     */
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment findFirstOrThrow
   */
  export type InvestmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investments.
     */
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment findMany
   */
  export type InvestmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investments to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment create
   */
  export type InvestmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Investment.
     */
    data: XOR<InvestmentCreateInput, InvestmentUncheckedCreateInput>
  }

  /**
   * Investment createMany
   */
  export type InvestmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Investments.
     */
    data: InvestmentCreateManyInput | InvestmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Investment createManyAndReturn
   */
  export type InvestmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * The data used to create many Investments.
     */
    data: InvestmentCreateManyInput | InvestmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Investment update
   */
  export type InvestmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Investment.
     */
    data: XOR<InvestmentUpdateInput, InvestmentUncheckedUpdateInput>
    /**
     * Choose, which Investment to update.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment updateMany
   */
  export type InvestmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Investments.
     */
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyInput>
    /**
     * Filter which Investments to update
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to update.
     */
    limit?: number
  }

  /**
   * Investment updateManyAndReturn
   */
  export type InvestmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * The data used to update Investments.
     */
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyInput>
    /**
     * Filter which Investments to update
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Investment upsert
   */
  export type InvestmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Investment to update in case it exists.
     */
    where: InvestmentWhereUniqueInput
    /**
     * In case the Investment found by the `where` argument doesn't exist, create a new Investment with this data.
     */
    create: XOR<InvestmentCreateInput, InvestmentUncheckedCreateInput>
    /**
     * In case the Investment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvestmentUpdateInput, InvestmentUncheckedUpdateInput>
  }

  /**
   * Investment delete
   */
  export type InvestmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter which Investment to delete.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment deleteMany
   */
  export type InvestmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investments to delete
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to delete.
     */
    limit?: number
  }

  /**
   * Investment without action
   */
  export type InvestmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    quantity: number | null
    price: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    quantity: number | null
    price: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    portfolio_id: string | null
    stock_id: string | null
    quantity: number | null
    price: Decimal | null
    type: $Enums.TransactionType | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    portfolio_id: string | null
    stock_id: string | null
    quantity: number | null
    price: Decimal | null
    type: $Enums.TransactionType | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    portfolio_id: number
    stock_id: number
    quantity: number
    price: number
    type: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type TransactionSumAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    price?: true
    type?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    price?: true
    type?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    price?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    portfolio_id: string
    stock_id: string
    quantity: number
    price: Decimal
    type: $Enums.TransactionType
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    price?: boolean
    type?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    price?: boolean
    type?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    price?: boolean
    type?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    price?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "portfolio_id" | "stock_id" | "quantity" | "price" | "type" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
      stock: Prisma.$StockTablePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      portfolio_id: string
      stock_id: string
      quantity: number
      price: Prisma.Decimal
      type: $Enums.TransactionType
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends StockTableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockTableDefaultArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly portfolio_id: FieldRef<"Transaction", 'String'>
    readonly stock_id: FieldRef<"Transaction", 'String'>
    readonly quantity: FieldRef<"Transaction", 'Int'>
    readonly price: FieldRef<"Transaction", 'Decimal'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Trade_request
   */

  export type AggregateTrade_request = {
    _count: Trade_requestCountAggregateOutputType | null
    _avg: Trade_requestAvgAggregateOutputType | null
    _sum: Trade_requestSumAggregateOutputType | null
    _min: Trade_requestMinAggregateOutputType | null
    _max: Trade_requestMaxAggregateOutputType | null
  }

  export type Trade_requestAvgAggregateOutputType = {
    quantity: number | null
  }

  export type Trade_requestSumAggregateOutputType = {
    quantity: number | null
  }

  export type Trade_requestMinAggregateOutputType = {
    id: string | null
    portfolio_id: string | null
    stock_id: string | null
    quantity: number | null
    status: $Enums.Status | null
    type: $Enums.TransactionType | null
    approved_by: string | null
    response: string | null
    createdAt: Date | null
  }

  export type Trade_requestMaxAggregateOutputType = {
    id: string | null
    portfolio_id: string | null
    stock_id: string | null
    quantity: number | null
    status: $Enums.Status | null
    type: $Enums.TransactionType | null
    approved_by: string | null
    response: string | null
    createdAt: Date | null
  }

  export type Trade_requestCountAggregateOutputType = {
    id: number
    portfolio_id: number
    stock_id: number
    quantity: number
    status: number
    type: number
    approved_by: number
    response: number
    createdAt: number
    _all: number
  }


  export type Trade_requestAvgAggregateInputType = {
    quantity?: true
  }

  export type Trade_requestSumAggregateInputType = {
    quantity?: true
  }

  export type Trade_requestMinAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    status?: true
    type?: true
    approved_by?: true
    response?: true
    createdAt?: true
  }

  export type Trade_requestMaxAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    status?: true
    type?: true
    approved_by?: true
    response?: true
    createdAt?: true
  }

  export type Trade_requestCountAggregateInputType = {
    id?: true
    portfolio_id?: true
    stock_id?: true
    quantity?: true
    status?: true
    type?: true
    approved_by?: true
    response?: true
    createdAt?: true
    _all?: true
  }

  export type Trade_requestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade_request to aggregate.
     */
    where?: Trade_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trade_requests to fetch.
     */
    orderBy?: Trade_requestOrderByWithRelationInput | Trade_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Trade_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trade_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trade_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trade_requests
    **/
    _count?: true | Trade_requestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Trade_requestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Trade_requestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Trade_requestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Trade_requestMaxAggregateInputType
  }

  export type GetTrade_requestAggregateType<T extends Trade_requestAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade_request]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade_request[P]>
      : GetScalarType<T[P], AggregateTrade_request[P]>
  }




  export type Trade_requestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Trade_requestWhereInput
    orderBy?: Trade_requestOrderByWithAggregationInput | Trade_requestOrderByWithAggregationInput[]
    by: Trade_requestScalarFieldEnum[] | Trade_requestScalarFieldEnum
    having?: Trade_requestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Trade_requestCountAggregateInputType | true
    _avg?: Trade_requestAvgAggregateInputType
    _sum?: Trade_requestSumAggregateInputType
    _min?: Trade_requestMinAggregateInputType
    _max?: Trade_requestMaxAggregateInputType
  }

  export type Trade_requestGroupByOutputType = {
    id: string
    portfolio_id: string
    stock_id: string
    quantity: number
    status: $Enums.Status
    type: $Enums.TransactionType
    approved_by: string | null
    response: string | null
    createdAt: Date
    _count: Trade_requestCountAggregateOutputType | null
    _avg: Trade_requestAvgAggregateOutputType | null
    _sum: Trade_requestSumAggregateOutputType | null
    _min: Trade_requestMinAggregateOutputType | null
    _max: Trade_requestMaxAggregateOutputType | null
  }

  type GetTrade_requestGroupByPayload<T extends Trade_requestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Trade_requestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Trade_requestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Trade_requestGroupByOutputType[P]>
            : GetScalarType<T[P], Trade_requestGroupByOutputType[P]>
        }
      >
    >


  export type Trade_requestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    status?: boolean
    type?: boolean
    approved_by?: boolean
    response?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
    approved?: boolean | Trade_request$approvedArgs<ExtArgs>
  }, ExtArgs["result"]["trade_request"]>

  export type Trade_requestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    status?: boolean
    type?: boolean
    approved_by?: boolean
    response?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
    approved?: boolean | Trade_request$approvedArgs<ExtArgs>
  }, ExtArgs["result"]["trade_request"]>

  export type Trade_requestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    status?: boolean
    type?: boolean
    approved_by?: boolean
    response?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
    approved?: boolean | Trade_request$approvedArgs<ExtArgs>
  }, ExtArgs["result"]["trade_request"]>

  export type Trade_requestSelectScalar = {
    id?: boolean
    portfolio_id?: boolean
    stock_id?: boolean
    quantity?: boolean
    status?: boolean
    type?: boolean
    approved_by?: boolean
    response?: boolean
    createdAt?: boolean
  }

  export type Trade_requestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "portfolio_id" | "stock_id" | "quantity" | "status" | "type" | "approved_by" | "response" | "createdAt", ExtArgs["result"]["trade_request"]>
  export type Trade_requestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
    approved?: boolean | Trade_request$approvedArgs<ExtArgs>
  }
  export type Trade_requestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
    approved?: boolean | Trade_request$approvedArgs<ExtArgs>
  }
  export type Trade_requestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    stock?: boolean | StockTableDefaultArgs<ExtArgs>
    approved?: boolean | Trade_request$approvedArgs<ExtArgs>
  }

  export type $Trade_requestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade_request"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
      stock: Prisma.$StockTablePayload<ExtArgs>
      approved: Prisma.$ManagerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      portfolio_id: string
      stock_id: string
      quantity: number
      status: $Enums.Status
      type: $Enums.TransactionType
      approved_by: string | null
      response: string | null
      createdAt: Date
    }, ExtArgs["result"]["trade_request"]>
    composites: {}
  }

  type Trade_requestGetPayload<S extends boolean | null | undefined | Trade_requestDefaultArgs> = $Result.GetResult<Prisma.$Trade_requestPayload, S>

  type Trade_requestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Trade_requestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Trade_requestCountAggregateInputType | true
    }

  export interface Trade_requestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade_request'], meta: { name: 'Trade_request' } }
    /**
     * Find zero or one Trade_request that matches the filter.
     * @param {Trade_requestFindUniqueArgs} args - Arguments to find a Trade_request
     * @example
     * // Get one Trade_request
     * const trade_request = await prisma.trade_request.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Trade_requestFindUniqueArgs>(args: SelectSubset<T, Trade_requestFindUniqueArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade_request that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Trade_requestFindUniqueOrThrowArgs} args - Arguments to find a Trade_request
     * @example
     * // Get one Trade_request
     * const trade_request = await prisma.trade_request.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Trade_requestFindUniqueOrThrowArgs>(args: SelectSubset<T, Trade_requestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade_request that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trade_requestFindFirstArgs} args - Arguments to find a Trade_request
     * @example
     * // Get one Trade_request
     * const trade_request = await prisma.trade_request.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Trade_requestFindFirstArgs>(args?: SelectSubset<T, Trade_requestFindFirstArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade_request that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trade_requestFindFirstOrThrowArgs} args - Arguments to find a Trade_request
     * @example
     * // Get one Trade_request
     * const trade_request = await prisma.trade_request.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Trade_requestFindFirstOrThrowArgs>(args?: SelectSubset<T, Trade_requestFindFirstOrThrowArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trade_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trade_requestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trade_requests
     * const trade_requests = await prisma.trade_request.findMany()
     * 
     * // Get first 10 Trade_requests
     * const trade_requests = await prisma.trade_request.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trade_requestWithIdOnly = await prisma.trade_request.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Trade_requestFindManyArgs>(args?: SelectSubset<T, Trade_requestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade_request.
     * @param {Trade_requestCreateArgs} args - Arguments to create a Trade_request.
     * @example
     * // Create one Trade_request
     * const Trade_request = await prisma.trade_request.create({
     *   data: {
     *     // ... data to create a Trade_request
     *   }
     * })
     * 
     */
    create<T extends Trade_requestCreateArgs>(args: SelectSubset<T, Trade_requestCreateArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trade_requests.
     * @param {Trade_requestCreateManyArgs} args - Arguments to create many Trade_requests.
     * @example
     * // Create many Trade_requests
     * const trade_request = await prisma.trade_request.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Trade_requestCreateManyArgs>(args?: SelectSubset<T, Trade_requestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trade_requests and returns the data saved in the database.
     * @param {Trade_requestCreateManyAndReturnArgs} args - Arguments to create many Trade_requests.
     * @example
     * // Create many Trade_requests
     * const trade_request = await prisma.trade_request.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trade_requests and only return the `id`
     * const trade_requestWithIdOnly = await prisma.trade_request.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Trade_requestCreateManyAndReturnArgs>(args?: SelectSubset<T, Trade_requestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade_request.
     * @param {Trade_requestDeleteArgs} args - Arguments to delete one Trade_request.
     * @example
     * // Delete one Trade_request
     * const Trade_request = await prisma.trade_request.delete({
     *   where: {
     *     // ... filter to delete one Trade_request
     *   }
     * })
     * 
     */
    delete<T extends Trade_requestDeleteArgs>(args: SelectSubset<T, Trade_requestDeleteArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade_request.
     * @param {Trade_requestUpdateArgs} args - Arguments to update one Trade_request.
     * @example
     * // Update one Trade_request
     * const trade_request = await prisma.trade_request.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Trade_requestUpdateArgs>(args: SelectSubset<T, Trade_requestUpdateArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trade_requests.
     * @param {Trade_requestDeleteManyArgs} args - Arguments to filter Trade_requests to delete.
     * @example
     * // Delete a few Trade_requests
     * const { count } = await prisma.trade_request.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Trade_requestDeleteManyArgs>(args?: SelectSubset<T, Trade_requestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trade_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trade_requestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trade_requests
     * const trade_request = await prisma.trade_request.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Trade_requestUpdateManyArgs>(args: SelectSubset<T, Trade_requestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trade_requests and returns the data updated in the database.
     * @param {Trade_requestUpdateManyAndReturnArgs} args - Arguments to update many Trade_requests.
     * @example
     * // Update many Trade_requests
     * const trade_request = await prisma.trade_request.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trade_requests and only return the `id`
     * const trade_requestWithIdOnly = await prisma.trade_request.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Trade_requestUpdateManyAndReturnArgs>(args: SelectSubset<T, Trade_requestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade_request.
     * @param {Trade_requestUpsertArgs} args - Arguments to update or create a Trade_request.
     * @example
     * // Update or create a Trade_request
     * const trade_request = await prisma.trade_request.upsert({
     *   create: {
     *     // ... data to create a Trade_request
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade_request we want to update
     *   }
     * })
     */
    upsert<T extends Trade_requestUpsertArgs>(args: SelectSubset<T, Trade_requestUpsertArgs<ExtArgs>>): Prisma__Trade_requestClient<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trade_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trade_requestCountArgs} args - Arguments to filter Trade_requests to count.
     * @example
     * // Count the number of Trade_requests
     * const count = await prisma.trade_request.count({
     *   where: {
     *     // ... the filter for the Trade_requests we want to count
     *   }
     * })
    **/
    count<T extends Trade_requestCountArgs>(
      args?: Subset<T, Trade_requestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Trade_requestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade_request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trade_requestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Trade_requestAggregateArgs>(args: Subset<T, Trade_requestAggregateArgs>): Prisma.PrismaPromise<GetTrade_requestAggregateType<T>>

    /**
     * Group by Trade_request.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Trade_requestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Trade_requestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Trade_requestGroupByArgs['orderBy'] }
        : { orderBy?: Trade_requestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Trade_requestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrade_requestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade_request model
   */
  readonly fields: Trade_requestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade_request.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Trade_requestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends StockTableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockTableDefaultArgs<ExtArgs>>): Prisma__StockTableClient<$Result.GetResult<Prisma.$StockTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approved<T extends Trade_request$approvedArgs<ExtArgs> = {}>(args?: Subset<T, Trade_request$approvedArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade_request model
   */
  interface Trade_requestFieldRefs {
    readonly id: FieldRef<"Trade_request", 'String'>
    readonly portfolio_id: FieldRef<"Trade_request", 'String'>
    readonly stock_id: FieldRef<"Trade_request", 'String'>
    readonly quantity: FieldRef<"Trade_request", 'Int'>
    readonly status: FieldRef<"Trade_request", 'Status'>
    readonly type: FieldRef<"Trade_request", 'TransactionType'>
    readonly approved_by: FieldRef<"Trade_request", 'String'>
    readonly response: FieldRef<"Trade_request", 'String'>
    readonly createdAt: FieldRef<"Trade_request", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade_request findUnique
   */
  export type Trade_requestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * Filter, which Trade_request to fetch.
     */
    where: Trade_requestWhereUniqueInput
  }

  /**
   * Trade_request findUniqueOrThrow
   */
  export type Trade_requestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * Filter, which Trade_request to fetch.
     */
    where: Trade_requestWhereUniqueInput
  }

  /**
   * Trade_request findFirst
   */
  export type Trade_requestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * Filter, which Trade_request to fetch.
     */
    where?: Trade_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trade_requests to fetch.
     */
    orderBy?: Trade_requestOrderByWithRelationInput | Trade_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trade_requests.
     */
    cursor?: Trade_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trade_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trade_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trade_requests.
     */
    distinct?: Trade_requestScalarFieldEnum | Trade_requestScalarFieldEnum[]
  }

  /**
   * Trade_request findFirstOrThrow
   */
  export type Trade_requestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * Filter, which Trade_request to fetch.
     */
    where?: Trade_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trade_requests to fetch.
     */
    orderBy?: Trade_requestOrderByWithRelationInput | Trade_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trade_requests.
     */
    cursor?: Trade_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trade_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trade_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trade_requests.
     */
    distinct?: Trade_requestScalarFieldEnum | Trade_requestScalarFieldEnum[]
  }

  /**
   * Trade_request findMany
   */
  export type Trade_requestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * Filter, which Trade_requests to fetch.
     */
    where?: Trade_requestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trade_requests to fetch.
     */
    orderBy?: Trade_requestOrderByWithRelationInput | Trade_requestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trade_requests.
     */
    cursor?: Trade_requestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trade_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trade_requests.
     */
    skip?: number
    distinct?: Trade_requestScalarFieldEnum | Trade_requestScalarFieldEnum[]
  }

  /**
   * Trade_request create
   */
  export type Trade_requestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade_request.
     */
    data: XOR<Trade_requestCreateInput, Trade_requestUncheckedCreateInput>
  }

  /**
   * Trade_request createMany
   */
  export type Trade_requestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trade_requests.
     */
    data: Trade_requestCreateManyInput | Trade_requestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade_request createManyAndReturn
   */
  export type Trade_requestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * The data used to create many Trade_requests.
     */
    data: Trade_requestCreateManyInput | Trade_requestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade_request update
   */
  export type Trade_requestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade_request.
     */
    data: XOR<Trade_requestUpdateInput, Trade_requestUncheckedUpdateInput>
    /**
     * Choose, which Trade_request to update.
     */
    where: Trade_requestWhereUniqueInput
  }

  /**
   * Trade_request updateMany
   */
  export type Trade_requestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trade_requests.
     */
    data: XOR<Trade_requestUpdateManyMutationInput, Trade_requestUncheckedUpdateManyInput>
    /**
     * Filter which Trade_requests to update
     */
    where?: Trade_requestWhereInput
    /**
     * Limit how many Trade_requests to update.
     */
    limit?: number
  }

  /**
   * Trade_request updateManyAndReturn
   */
  export type Trade_requestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * The data used to update Trade_requests.
     */
    data: XOR<Trade_requestUpdateManyMutationInput, Trade_requestUncheckedUpdateManyInput>
    /**
     * Filter which Trade_requests to update
     */
    where?: Trade_requestWhereInput
    /**
     * Limit how many Trade_requests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade_request upsert
   */
  export type Trade_requestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade_request to update in case it exists.
     */
    where: Trade_requestWhereUniqueInput
    /**
     * In case the Trade_request found by the `where` argument doesn't exist, create a new Trade_request with this data.
     */
    create: XOR<Trade_requestCreateInput, Trade_requestUncheckedCreateInput>
    /**
     * In case the Trade_request was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Trade_requestUpdateInput, Trade_requestUncheckedUpdateInput>
  }

  /**
   * Trade_request delete
   */
  export type Trade_requestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    /**
     * Filter which Trade_request to delete.
     */
    where: Trade_requestWhereUniqueInput
  }

  /**
   * Trade_request deleteMany
   */
  export type Trade_requestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade_requests to delete
     */
    where?: Trade_requestWhereInput
    /**
     * Limit how many Trade_requests to delete.
     */
    limit?: number
  }

  /**
   * Trade_request.approved
   */
  export type Trade_request$approvedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    where?: ManagerWhereInput
  }

  /**
   * Trade_request without action
   */
  export type Trade_requestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    user_id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    user_id: string
    createdAt: Date
    updatedAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    user_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "user_id" | "createdAt" | "updatedAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      user_id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly user_id: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly updatedAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Manager
   */

  export type AggregateManager = {
    _count: ManagerCountAggregateOutputType | null
    _avg: ManagerAvgAggregateOutputType | null
    _sum: ManagerSumAggregateOutputType | null
    _min: ManagerMinAggregateOutputType | null
    _max: ManagerMaxAggregateOutputType | null
  }

  export type ManagerAvgAggregateOutputType = {
    manager_slot: number | null
  }

  export type ManagerSumAggregateOutputType = {
    manager_slot: number | null
  }

  export type ManagerMinAggregateOutputType = {
    id: string | null
    manager_id: string | null
    approval_code: string | null
    client_id: string | null
    manager_slot: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ManagerMaxAggregateOutputType = {
    id: string | null
    manager_id: string | null
    approval_code: string | null
    client_id: string | null
    manager_slot: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ManagerCountAggregateOutputType = {
    id: number
    manager_id: number
    approval_code: number
    client_id: number
    manager_slot: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ManagerAvgAggregateInputType = {
    manager_slot?: true
  }

  export type ManagerSumAggregateInputType = {
    manager_slot?: true
  }

  export type ManagerMinAggregateInputType = {
    id?: true
    manager_id?: true
    approval_code?: true
    client_id?: true
    manager_slot?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ManagerMaxAggregateInputType = {
    id?: true
    manager_id?: true
    approval_code?: true
    client_id?: true
    manager_slot?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ManagerCountAggregateInputType = {
    id?: true
    manager_id?: true
    approval_code?: true
    client_id?: true
    manager_slot?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ManagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Manager to aggregate.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Managers
    **/
    _count?: true | ManagerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ManagerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ManagerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManagerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManagerMaxAggregateInputType
  }

  export type GetManagerAggregateType<T extends ManagerAggregateArgs> = {
        [P in keyof T & keyof AggregateManager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManager[P]>
      : GetScalarType<T[P], AggregateManager[P]>
  }




  export type ManagerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManagerWhereInput
    orderBy?: ManagerOrderByWithAggregationInput | ManagerOrderByWithAggregationInput[]
    by: ManagerScalarFieldEnum[] | ManagerScalarFieldEnum
    having?: ManagerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManagerCountAggregateInputType | true
    _avg?: ManagerAvgAggregateInputType
    _sum?: ManagerSumAggregateInputType
    _min?: ManagerMinAggregateInputType
    _max?: ManagerMaxAggregateInputType
  }

  export type ManagerGroupByOutputType = {
    id: string
    manager_id: string
    approval_code: string
    client_id: string | null
    manager_slot: number
    createdAt: Date
    updatedAt: Date
    _count: ManagerCountAggregateOutputType | null
    _avg: ManagerAvgAggregateOutputType | null
    _sum: ManagerSumAggregateOutputType | null
    _min: ManagerMinAggregateOutputType | null
    _max: ManagerMaxAggregateOutputType | null
  }

  type GetManagerGroupByPayload<T extends ManagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManagerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManagerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManagerGroupByOutputType[P]>
            : GetScalarType<T[P], ManagerGroupByOutputType[P]>
        }
      >
    >


  export type ManagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    manager_id?: boolean
    approval_code?: boolean
    client_id?: boolean
    manager_slot?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    managed_by?: boolean | Manager$managed_byArgs<ExtArgs>
    approvedBy?: boolean | Manager$approvedByArgs<ExtArgs>
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type ManagerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    manager_id?: boolean
    approval_code?: boolean
    client_id?: boolean
    manager_slot?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type ManagerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    manager_id?: boolean
    approval_code?: boolean
    client_id?: boolean
    manager_slot?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type ManagerSelectScalar = {
    id?: boolean
    manager_id?: boolean
    approval_code?: boolean
    client_id?: boolean
    manager_slot?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ManagerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "manager_id" | "approval_code" | "client_id" | "manager_slot" | "createdAt" | "updatedAt", ExtArgs["result"]["manager"]>
  export type ManagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    managed_by?: boolean | Manager$managed_byArgs<ExtArgs>
    approvedBy?: boolean | Manager$approvedByArgs<ExtArgs>
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ManagerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ManagerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ManagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Manager"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      managed_by: Prisma.$UserPayload<ExtArgs>[]
      approvedBy: Prisma.$Trade_requestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      manager_id: string
      approval_code: string
      client_id: string | null
      manager_slot: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["manager"]>
    composites: {}
  }

  type ManagerGetPayload<S extends boolean | null | undefined | ManagerDefaultArgs> = $Result.GetResult<Prisma.$ManagerPayload, S>

  type ManagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ManagerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ManagerCountAggregateInputType | true
    }

  export interface ManagerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Manager'], meta: { name: 'Manager' } }
    /**
     * Find zero or one Manager that matches the filter.
     * @param {ManagerFindUniqueArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManagerFindUniqueArgs>(args: SelectSubset<T, ManagerFindUniqueArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Manager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ManagerFindUniqueOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManagerFindUniqueOrThrowArgs>(args: SelectSubset<T, ManagerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Manager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManagerFindFirstArgs>(args?: SelectSubset<T, ManagerFindFirstArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Manager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManagerFindFirstOrThrowArgs>(args?: SelectSubset<T, ManagerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Managers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Managers
     * const managers = await prisma.manager.findMany()
     * 
     * // Get first 10 Managers
     * const managers = await prisma.manager.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const managerWithIdOnly = await prisma.manager.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ManagerFindManyArgs>(args?: SelectSubset<T, ManagerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Manager.
     * @param {ManagerCreateArgs} args - Arguments to create a Manager.
     * @example
     * // Create one Manager
     * const Manager = await prisma.manager.create({
     *   data: {
     *     // ... data to create a Manager
     *   }
     * })
     * 
     */
    create<T extends ManagerCreateArgs>(args: SelectSubset<T, ManagerCreateArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Managers.
     * @param {ManagerCreateManyArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ManagerCreateManyArgs>(args?: SelectSubset<T, ManagerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Managers and returns the data saved in the database.
     * @param {ManagerCreateManyAndReturnArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ManagerCreateManyAndReturnArgs>(args?: SelectSubset<T, ManagerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Manager.
     * @param {ManagerDeleteArgs} args - Arguments to delete one Manager.
     * @example
     * // Delete one Manager
     * const Manager = await prisma.manager.delete({
     *   where: {
     *     // ... filter to delete one Manager
     *   }
     * })
     * 
     */
    delete<T extends ManagerDeleteArgs>(args: SelectSubset<T, ManagerDeleteArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Manager.
     * @param {ManagerUpdateArgs} args - Arguments to update one Manager.
     * @example
     * // Update one Manager
     * const manager = await prisma.manager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ManagerUpdateArgs>(args: SelectSubset<T, ManagerUpdateArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Managers.
     * @param {ManagerDeleteManyArgs} args - Arguments to filter Managers to delete.
     * @example
     * // Delete a few Managers
     * const { count } = await prisma.manager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ManagerDeleteManyArgs>(args?: SelectSubset<T, ManagerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ManagerUpdateManyArgs>(args: SelectSubset<T, ManagerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Managers and returns the data updated in the database.
     * @param {ManagerUpdateManyAndReturnArgs} args - Arguments to update many Managers.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ManagerUpdateManyAndReturnArgs>(args: SelectSubset<T, ManagerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Manager.
     * @param {ManagerUpsertArgs} args - Arguments to update or create a Manager.
     * @example
     * // Update or create a Manager
     * const manager = await prisma.manager.upsert({
     *   create: {
     *     // ... data to create a Manager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Manager we want to update
     *   }
     * })
     */
    upsert<T extends ManagerUpsertArgs>(args: SelectSubset<T, ManagerUpsertArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerCountArgs} args - Arguments to filter Managers to count.
     * @example
     * // Count the number of Managers
     * const count = await prisma.manager.count({
     *   where: {
     *     // ... the filter for the Managers we want to count
     *   }
     * })
    **/
    count<T extends ManagerCountArgs>(
      args?: Subset<T, ManagerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManagerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ManagerAggregateArgs>(args: Subset<T, ManagerAggregateArgs>): Prisma.PrismaPromise<GetManagerAggregateType<T>>

    /**
     * Group by Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ManagerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManagerGroupByArgs['orderBy'] }
        : { orderBy?: ManagerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ManagerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Manager model
   */
  readonly fields: ManagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Manager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManagerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    managed_by<T extends Manager$managed_byArgs<ExtArgs> = {}>(args?: Subset<T, Manager$managed_byArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvedBy<T extends Manager$approvedByArgs<ExtArgs> = {}>(args?: Subset<T, Manager$approvedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Trade_requestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Manager model
   */
  interface ManagerFieldRefs {
    readonly id: FieldRef<"Manager", 'String'>
    readonly manager_id: FieldRef<"Manager", 'String'>
    readonly approval_code: FieldRef<"Manager", 'String'>
    readonly client_id: FieldRef<"Manager", 'String'>
    readonly manager_slot: FieldRef<"Manager", 'Int'>
    readonly createdAt: FieldRef<"Manager", 'DateTime'>
    readonly updatedAt: FieldRef<"Manager", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Manager findUnique
   */
  export type ManagerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager findUniqueOrThrow
   */
  export type ManagerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager findFirst
   */
  export type ManagerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Manager findFirstOrThrow
   */
  export type ManagerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Manager findMany
   */
  export type ManagerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Managers to fetch.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Managers.
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Manager create
   */
  export type ManagerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * The data needed to create a Manager.
     */
    data: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>
  }

  /**
   * Manager createMany
   */
  export type ManagerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Manager createManyAndReturn
   */
  export type ManagerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Manager update
   */
  export type ManagerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * The data needed to update a Manager.
     */
    data: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>
    /**
     * Choose, which Manager to update.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager updateMany
   */
  export type ManagerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput
    /**
     * Limit how many Managers to update.
     */
    limit?: number
  }

  /**
   * Manager updateManyAndReturn
   */
  export type ManagerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput
    /**
     * Limit how many Managers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Manager upsert
   */
  export type ManagerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * The filter to search for the Manager to update in case it exists.
     */
    where: ManagerWhereUniqueInput
    /**
     * In case the Manager found by the `where` argument doesn't exist, create a new Manager with this data.
     */
    create: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>
    /**
     * In case the Manager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>
  }

  /**
   * Manager delete
   */
  export type ManagerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter which Manager to delete.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager deleteMany
   */
  export type ManagerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Managers to delete
     */
    where?: ManagerWhereInput
    /**
     * Limit how many Managers to delete.
     */
    limit?: number
  }

  /**
   * Manager.managed_by
   */
  export type Manager$managed_byArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Manager.approvedBy
   */
  export type Manager$approvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade_request
     */
    select?: Trade_requestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade_request
     */
    omit?: Trade_requestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Trade_requestInclude<ExtArgs> | null
    where?: Trade_requestWhereInput
    orderBy?: Trade_requestOrderByWithRelationInput | Trade_requestOrderByWithRelationInput[]
    cursor?: Trade_requestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Trade_requestScalarFieldEnum | Trade_requestScalarFieldEnum[]
  }

  /**
   * Manager without action
   */
  export type ManagerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    super_admin_access: string | null
    super_admin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    super_admin_access: string | null
    super_admin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    user_id: number
    super_admin_access: number
    super_admin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    user_id?: true
    super_admin_access?: true
    super_admin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    user_id?: true
    super_admin_access?: true
    super_admin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    user_id?: true
    super_admin_access?: true
    super_admin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    user_id: string
    super_admin_access: string | null
    super_admin: boolean
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    super_admin_access?: boolean
    super_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin_id?: boolean | Admin$admin_idArgs<ExtArgs>
    super_admin_id?: boolean | Admin$super_admin_idArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    super_admin_access?: boolean
    super_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    super_admin_access?: boolean
    super_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    user_id?: boolean
    super_admin_access?: boolean
    super_admin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "super_admin_access" | "super_admin" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin_id?: boolean | Admin$admin_idArgs<ExtArgs>
    super_admin_id?: boolean | Admin$super_admin_idArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      admin_id: Prisma.$Approved_ManagerPayload<ExtArgs>[]
      super_admin_id: Prisma.$Approved_AdminPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      super_admin_access: string | null
      super_admin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin_id<T extends Admin$admin_idArgs<ExtArgs> = {}>(args?: Subset<T, Admin$admin_idArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    super_admin_id<T extends Admin$super_admin_idArgs<ExtArgs> = {}>(args?: Subset<T, Admin$super_admin_idArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly user_id: FieldRef<"Admin", 'String'>
    readonly super_admin_access: FieldRef<"Admin", 'String'>
    readonly super_admin: FieldRef<"Admin", 'Boolean'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin.admin_id
   */
  export type Admin$admin_idArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    where?: Approved_ManagerWhereInput
    orderBy?: Approved_ManagerOrderByWithRelationInput | Approved_ManagerOrderByWithRelationInput[]
    cursor?: Approved_ManagerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Approved_ManagerScalarFieldEnum | Approved_ManagerScalarFieldEnum[]
  }

  /**
   * Admin.super_admin_id
   */
  export type Admin$super_admin_idArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    where?: Approved_AdminWhereInput
    orderBy?: Approved_AdminOrderByWithRelationInput | Approved_AdminOrderByWithRelationInput[]
    cursor?: Approved_AdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Approved_AdminScalarFieldEnum | Approved_AdminScalarFieldEnum[]
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Approved_Manager
   */

  export type AggregateApproved_Manager = {
    _count: Approved_ManagerCountAggregateOutputType | null
    _avg: Approved_ManagerAvgAggregateOutputType | null
    _sum: Approved_ManagerSumAggregateOutputType | null
    _min: Approved_ManagerMinAggregateOutputType | null
    _max: Approved_ManagerMaxAggregateOutputType | null
  }

  export type Approved_ManagerAvgAggregateOutputType = {
    manager_slot: number | null
  }

  export type Approved_ManagerSumAggregateOutputType = {
    manager_slot: number | null
  }

  export type Approved_ManagerMinAggregateOutputType = {
    id: string | null
    approval_code: string | null
    user_id: string | null
    admin_id: string | null
    manager_slot: number | null
    is_used: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Approved_ManagerMaxAggregateOutputType = {
    id: string | null
    approval_code: string | null
    user_id: string | null
    admin_id: string | null
    manager_slot: number | null
    is_used: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Approved_ManagerCountAggregateOutputType = {
    id: number
    approval_code: number
    user_id: number
    admin_id: number
    manager_slot: number
    is_used: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Approved_ManagerAvgAggregateInputType = {
    manager_slot?: true
  }

  export type Approved_ManagerSumAggregateInputType = {
    manager_slot?: true
  }

  export type Approved_ManagerMinAggregateInputType = {
    id?: true
    approval_code?: true
    user_id?: true
    admin_id?: true
    manager_slot?: true
    is_used?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Approved_ManagerMaxAggregateInputType = {
    id?: true
    approval_code?: true
    user_id?: true
    admin_id?: true
    manager_slot?: true
    is_used?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Approved_ManagerCountAggregateInputType = {
    id?: true
    approval_code?: true
    user_id?: true
    admin_id?: true
    manager_slot?: true
    is_used?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Approved_ManagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Approved_Manager to aggregate.
     */
    where?: Approved_ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Managers to fetch.
     */
    orderBy?: Approved_ManagerOrderByWithRelationInput | Approved_ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Approved_ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Approved_Managers
    **/
    _count?: true | Approved_ManagerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Approved_ManagerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Approved_ManagerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Approved_ManagerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Approved_ManagerMaxAggregateInputType
  }

  export type GetApproved_ManagerAggregateType<T extends Approved_ManagerAggregateArgs> = {
        [P in keyof T & keyof AggregateApproved_Manager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApproved_Manager[P]>
      : GetScalarType<T[P], AggregateApproved_Manager[P]>
  }




  export type Approved_ManagerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Approved_ManagerWhereInput
    orderBy?: Approved_ManagerOrderByWithAggregationInput | Approved_ManagerOrderByWithAggregationInput[]
    by: Approved_ManagerScalarFieldEnum[] | Approved_ManagerScalarFieldEnum
    having?: Approved_ManagerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Approved_ManagerCountAggregateInputType | true
    _avg?: Approved_ManagerAvgAggregateInputType
    _sum?: Approved_ManagerSumAggregateInputType
    _min?: Approved_ManagerMinAggregateInputType
    _max?: Approved_ManagerMaxAggregateInputType
  }

  export type Approved_ManagerGroupByOutputType = {
    id: string
    approval_code: string
    user_id: string
    admin_id: string
    manager_slot: number
    is_used: boolean
    createdAt: Date
    updatedAt: Date
    _count: Approved_ManagerCountAggregateOutputType | null
    _avg: Approved_ManagerAvgAggregateOutputType | null
    _sum: Approved_ManagerSumAggregateOutputType | null
    _min: Approved_ManagerMinAggregateOutputType | null
    _max: Approved_ManagerMaxAggregateOutputType | null
  }

  type GetApproved_ManagerGroupByPayload<T extends Approved_ManagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Approved_ManagerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Approved_ManagerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Approved_ManagerGroupByOutputType[P]>
            : GetScalarType<T[P], Approved_ManagerGroupByOutputType[P]>
        }
      >
    >


  export type Approved_ManagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approval_code?: boolean
    user_id?: boolean
    admin_id?: boolean
    manager_slot?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approved_Manager"]>

  export type Approved_ManagerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approval_code?: boolean
    user_id?: boolean
    admin_id?: boolean
    manager_slot?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approved_Manager"]>

  export type Approved_ManagerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approval_code?: boolean
    user_id?: boolean
    admin_id?: boolean
    manager_slot?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approved_Manager"]>

  export type Approved_ManagerSelectScalar = {
    id?: boolean
    approval_code?: boolean
    user_id?: boolean
    admin_id?: boolean
    manager_slot?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type Approved_ManagerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "approval_code" | "user_id" | "admin_id" | "manager_slot" | "is_used" | "createdAt" | "updatedAt", ExtArgs["result"]["approved_Manager"]>
  export type Approved_ManagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }
  export type Approved_ManagerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }
  export type Approved_ManagerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }

  export type $Approved_ManagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Approved_Manager"
    objects: {
      manager: Prisma.$UserPayload<ExtArgs>
      admin: Prisma.$AdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approval_code: string
      user_id: string
      admin_id: string
      manager_slot: number
      is_used: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["approved_Manager"]>
    composites: {}
  }

  type Approved_ManagerGetPayload<S extends boolean | null | undefined | Approved_ManagerDefaultArgs> = $Result.GetResult<Prisma.$Approved_ManagerPayload, S>

  type Approved_ManagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Approved_ManagerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Approved_ManagerCountAggregateInputType | true
    }

  export interface Approved_ManagerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Approved_Manager'], meta: { name: 'Approved_Manager' } }
    /**
     * Find zero or one Approved_Manager that matches the filter.
     * @param {Approved_ManagerFindUniqueArgs} args - Arguments to find a Approved_Manager
     * @example
     * // Get one Approved_Manager
     * const approved_Manager = await prisma.approved_Manager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Approved_ManagerFindUniqueArgs>(args: SelectSubset<T, Approved_ManagerFindUniqueArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Approved_Manager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Approved_ManagerFindUniqueOrThrowArgs} args - Arguments to find a Approved_Manager
     * @example
     * // Get one Approved_Manager
     * const approved_Manager = await prisma.approved_Manager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Approved_ManagerFindUniqueOrThrowArgs>(args: SelectSubset<T, Approved_ManagerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approved_Manager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_ManagerFindFirstArgs} args - Arguments to find a Approved_Manager
     * @example
     * // Get one Approved_Manager
     * const approved_Manager = await prisma.approved_Manager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Approved_ManagerFindFirstArgs>(args?: SelectSubset<T, Approved_ManagerFindFirstArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approved_Manager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_ManagerFindFirstOrThrowArgs} args - Arguments to find a Approved_Manager
     * @example
     * // Get one Approved_Manager
     * const approved_Manager = await prisma.approved_Manager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Approved_ManagerFindFirstOrThrowArgs>(args?: SelectSubset<T, Approved_ManagerFindFirstOrThrowArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Approved_Managers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_ManagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Approved_Managers
     * const approved_Managers = await prisma.approved_Manager.findMany()
     * 
     * // Get first 10 Approved_Managers
     * const approved_Managers = await prisma.approved_Manager.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approved_ManagerWithIdOnly = await prisma.approved_Manager.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Approved_ManagerFindManyArgs>(args?: SelectSubset<T, Approved_ManagerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Approved_Manager.
     * @param {Approved_ManagerCreateArgs} args - Arguments to create a Approved_Manager.
     * @example
     * // Create one Approved_Manager
     * const Approved_Manager = await prisma.approved_Manager.create({
     *   data: {
     *     // ... data to create a Approved_Manager
     *   }
     * })
     * 
     */
    create<T extends Approved_ManagerCreateArgs>(args: SelectSubset<T, Approved_ManagerCreateArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Approved_Managers.
     * @param {Approved_ManagerCreateManyArgs} args - Arguments to create many Approved_Managers.
     * @example
     * // Create many Approved_Managers
     * const approved_Manager = await prisma.approved_Manager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Approved_ManagerCreateManyArgs>(args?: SelectSubset<T, Approved_ManagerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Approved_Managers and returns the data saved in the database.
     * @param {Approved_ManagerCreateManyAndReturnArgs} args - Arguments to create many Approved_Managers.
     * @example
     * // Create many Approved_Managers
     * const approved_Manager = await prisma.approved_Manager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Approved_Managers and only return the `id`
     * const approved_ManagerWithIdOnly = await prisma.approved_Manager.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Approved_ManagerCreateManyAndReturnArgs>(args?: SelectSubset<T, Approved_ManagerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Approved_Manager.
     * @param {Approved_ManagerDeleteArgs} args - Arguments to delete one Approved_Manager.
     * @example
     * // Delete one Approved_Manager
     * const Approved_Manager = await prisma.approved_Manager.delete({
     *   where: {
     *     // ... filter to delete one Approved_Manager
     *   }
     * })
     * 
     */
    delete<T extends Approved_ManagerDeleteArgs>(args: SelectSubset<T, Approved_ManagerDeleteArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Approved_Manager.
     * @param {Approved_ManagerUpdateArgs} args - Arguments to update one Approved_Manager.
     * @example
     * // Update one Approved_Manager
     * const approved_Manager = await prisma.approved_Manager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Approved_ManagerUpdateArgs>(args: SelectSubset<T, Approved_ManagerUpdateArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Approved_Managers.
     * @param {Approved_ManagerDeleteManyArgs} args - Arguments to filter Approved_Managers to delete.
     * @example
     * // Delete a few Approved_Managers
     * const { count } = await prisma.approved_Manager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Approved_ManagerDeleteManyArgs>(args?: SelectSubset<T, Approved_ManagerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approved_Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_ManagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Approved_Managers
     * const approved_Manager = await prisma.approved_Manager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Approved_ManagerUpdateManyArgs>(args: SelectSubset<T, Approved_ManagerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approved_Managers and returns the data updated in the database.
     * @param {Approved_ManagerUpdateManyAndReturnArgs} args - Arguments to update many Approved_Managers.
     * @example
     * // Update many Approved_Managers
     * const approved_Manager = await prisma.approved_Manager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Approved_Managers and only return the `id`
     * const approved_ManagerWithIdOnly = await prisma.approved_Manager.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Approved_ManagerUpdateManyAndReturnArgs>(args: SelectSubset<T, Approved_ManagerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Approved_Manager.
     * @param {Approved_ManagerUpsertArgs} args - Arguments to update or create a Approved_Manager.
     * @example
     * // Update or create a Approved_Manager
     * const approved_Manager = await prisma.approved_Manager.upsert({
     *   create: {
     *     // ... data to create a Approved_Manager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Approved_Manager we want to update
     *   }
     * })
     */
    upsert<T extends Approved_ManagerUpsertArgs>(args: SelectSubset<T, Approved_ManagerUpsertArgs<ExtArgs>>): Prisma__Approved_ManagerClient<$Result.GetResult<Prisma.$Approved_ManagerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Approved_Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_ManagerCountArgs} args - Arguments to filter Approved_Managers to count.
     * @example
     * // Count the number of Approved_Managers
     * const count = await prisma.approved_Manager.count({
     *   where: {
     *     // ... the filter for the Approved_Managers we want to count
     *   }
     * })
    **/
    count<T extends Approved_ManagerCountArgs>(
      args?: Subset<T, Approved_ManagerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Approved_ManagerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Approved_Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_ManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Approved_ManagerAggregateArgs>(args: Subset<T, Approved_ManagerAggregateArgs>): Prisma.PrismaPromise<GetApproved_ManagerAggregateType<T>>

    /**
     * Group by Approved_Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_ManagerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Approved_ManagerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Approved_ManagerGroupByArgs['orderBy'] }
        : { orderBy?: Approved_ManagerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Approved_ManagerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApproved_ManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Approved_Manager model
   */
  readonly fields: Approved_ManagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Approved_Manager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Approved_ManagerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    manager<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Approved_Manager model
   */
  interface Approved_ManagerFieldRefs {
    readonly id: FieldRef<"Approved_Manager", 'String'>
    readonly approval_code: FieldRef<"Approved_Manager", 'String'>
    readonly user_id: FieldRef<"Approved_Manager", 'String'>
    readonly admin_id: FieldRef<"Approved_Manager", 'String'>
    readonly manager_slot: FieldRef<"Approved_Manager", 'Int'>
    readonly is_used: FieldRef<"Approved_Manager", 'Boolean'>
    readonly createdAt: FieldRef<"Approved_Manager", 'DateTime'>
    readonly updatedAt: FieldRef<"Approved_Manager", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Approved_Manager findUnique
   */
  export type Approved_ManagerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Manager to fetch.
     */
    where: Approved_ManagerWhereUniqueInput
  }

  /**
   * Approved_Manager findUniqueOrThrow
   */
  export type Approved_ManagerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Manager to fetch.
     */
    where: Approved_ManagerWhereUniqueInput
  }

  /**
   * Approved_Manager findFirst
   */
  export type Approved_ManagerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Manager to fetch.
     */
    where?: Approved_ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Managers to fetch.
     */
    orderBy?: Approved_ManagerOrderByWithRelationInput | Approved_ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Approved_Managers.
     */
    cursor?: Approved_ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Approved_Managers.
     */
    distinct?: Approved_ManagerScalarFieldEnum | Approved_ManagerScalarFieldEnum[]
  }

  /**
   * Approved_Manager findFirstOrThrow
   */
  export type Approved_ManagerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Manager to fetch.
     */
    where?: Approved_ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Managers to fetch.
     */
    orderBy?: Approved_ManagerOrderByWithRelationInput | Approved_ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Approved_Managers.
     */
    cursor?: Approved_ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Approved_Managers.
     */
    distinct?: Approved_ManagerScalarFieldEnum | Approved_ManagerScalarFieldEnum[]
  }

  /**
   * Approved_Manager findMany
   */
  export type Approved_ManagerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Managers to fetch.
     */
    where?: Approved_ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Managers to fetch.
     */
    orderBy?: Approved_ManagerOrderByWithRelationInput | Approved_ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Approved_Managers.
     */
    cursor?: Approved_ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Managers.
     */
    skip?: number
    distinct?: Approved_ManagerScalarFieldEnum | Approved_ManagerScalarFieldEnum[]
  }

  /**
   * Approved_Manager create
   */
  export type Approved_ManagerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * The data needed to create a Approved_Manager.
     */
    data: XOR<Approved_ManagerCreateInput, Approved_ManagerUncheckedCreateInput>
  }

  /**
   * Approved_Manager createMany
   */
  export type Approved_ManagerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Approved_Managers.
     */
    data: Approved_ManagerCreateManyInput | Approved_ManagerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Approved_Manager createManyAndReturn
   */
  export type Approved_ManagerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * The data used to create many Approved_Managers.
     */
    data: Approved_ManagerCreateManyInput | Approved_ManagerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Approved_Manager update
   */
  export type Approved_ManagerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * The data needed to update a Approved_Manager.
     */
    data: XOR<Approved_ManagerUpdateInput, Approved_ManagerUncheckedUpdateInput>
    /**
     * Choose, which Approved_Manager to update.
     */
    where: Approved_ManagerWhereUniqueInput
  }

  /**
   * Approved_Manager updateMany
   */
  export type Approved_ManagerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Approved_Managers.
     */
    data: XOR<Approved_ManagerUpdateManyMutationInput, Approved_ManagerUncheckedUpdateManyInput>
    /**
     * Filter which Approved_Managers to update
     */
    where?: Approved_ManagerWhereInput
    /**
     * Limit how many Approved_Managers to update.
     */
    limit?: number
  }

  /**
   * Approved_Manager updateManyAndReturn
   */
  export type Approved_ManagerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * The data used to update Approved_Managers.
     */
    data: XOR<Approved_ManagerUpdateManyMutationInput, Approved_ManagerUncheckedUpdateManyInput>
    /**
     * Filter which Approved_Managers to update
     */
    where?: Approved_ManagerWhereInput
    /**
     * Limit how many Approved_Managers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Approved_Manager upsert
   */
  export type Approved_ManagerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * The filter to search for the Approved_Manager to update in case it exists.
     */
    where: Approved_ManagerWhereUniqueInput
    /**
     * In case the Approved_Manager found by the `where` argument doesn't exist, create a new Approved_Manager with this data.
     */
    create: XOR<Approved_ManagerCreateInput, Approved_ManagerUncheckedCreateInput>
    /**
     * In case the Approved_Manager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Approved_ManagerUpdateInput, Approved_ManagerUncheckedUpdateInput>
  }

  /**
   * Approved_Manager delete
   */
  export type Approved_ManagerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
    /**
     * Filter which Approved_Manager to delete.
     */
    where: Approved_ManagerWhereUniqueInput
  }

  /**
   * Approved_Manager deleteMany
   */
  export type Approved_ManagerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Approved_Managers to delete
     */
    where?: Approved_ManagerWhereInput
    /**
     * Limit how many Approved_Managers to delete.
     */
    limit?: number
  }

  /**
   * Approved_Manager without action
   */
  export type Approved_ManagerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Manager
     */
    select?: Approved_ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Manager
     */
    omit?: Approved_ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_ManagerInclude<ExtArgs> | null
  }


  /**
   * Model Approved_Admin
   */

  export type AggregateApproved_Admin = {
    _count: Approved_AdminCountAggregateOutputType | null
    _min: Approved_AdminMinAggregateOutputType | null
    _max: Approved_AdminMaxAggregateOutputType | null
  }

  export type Approved_AdminMinAggregateOutputType = {
    id: string | null
    approval_code: string | null
    admin_id: string | null
    superAdmin_id: string | null
    is_used: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Approved_AdminMaxAggregateOutputType = {
    id: string | null
    approval_code: string | null
    admin_id: string | null
    superAdmin_id: string | null
    is_used: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Approved_AdminCountAggregateOutputType = {
    id: number
    approval_code: number
    admin_id: number
    superAdmin_id: number
    is_used: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Approved_AdminMinAggregateInputType = {
    id?: true
    approval_code?: true
    admin_id?: true
    superAdmin_id?: true
    is_used?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Approved_AdminMaxAggregateInputType = {
    id?: true
    approval_code?: true
    admin_id?: true
    superAdmin_id?: true
    is_used?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Approved_AdminCountAggregateInputType = {
    id?: true
    approval_code?: true
    admin_id?: true
    superAdmin_id?: true
    is_used?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Approved_AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Approved_Admin to aggregate.
     */
    where?: Approved_AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Admins to fetch.
     */
    orderBy?: Approved_AdminOrderByWithRelationInput | Approved_AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Approved_AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Approved_Admins
    **/
    _count?: true | Approved_AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Approved_AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Approved_AdminMaxAggregateInputType
  }

  export type GetApproved_AdminAggregateType<T extends Approved_AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateApproved_Admin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApproved_Admin[P]>
      : GetScalarType<T[P], AggregateApproved_Admin[P]>
  }




  export type Approved_AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Approved_AdminWhereInput
    orderBy?: Approved_AdminOrderByWithAggregationInput | Approved_AdminOrderByWithAggregationInput[]
    by: Approved_AdminScalarFieldEnum[] | Approved_AdminScalarFieldEnum
    having?: Approved_AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Approved_AdminCountAggregateInputType | true
    _min?: Approved_AdminMinAggregateInputType
    _max?: Approved_AdminMaxAggregateInputType
  }

  export type Approved_AdminGroupByOutputType = {
    id: string
    approval_code: string
    admin_id: string | null
    superAdmin_id: string
    is_used: boolean
    createdAt: Date
    updatedAt: Date
    _count: Approved_AdminCountAggregateOutputType | null
    _min: Approved_AdminMinAggregateOutputType | null
    _max: Approved_AdminMaxAggregateOutputType | null
  }

  type GetApproved_AdminGroupByPayload<T extends Approved_AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Approved_AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Approved_AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Approved_AdminGroupByOutputType[P]>
            : GetScalarType<T[P], Approved_AdminGroupByOutputType[P]>
        }
      >
    >


  export type Approved_AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approval_code?: boolean
    admin_id?: boolean
    superAdmin_id?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | Approved_Admin$adminArgs<ExtArgs>
    superAdmin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approved_Admin"]>

  export type Approved_AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approval_code?: boolean
    admin_id?: boolean
    superAdmin_id?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | Approved_Admin$adminArgs<ExtArgs>
    superAdmin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approved_Admin"]>

  export type Approved_AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approval_code?: boolean
    admin_id?: boolean
    superAdmin_id?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    admin?: boolean | Approved_Admin$adminArgs<ExtArgs>
    superAdmin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["approved_Admin"]>

  export type Approved_AdminSelectScalar = {
    id?: boolean
    approval_code?: boolean
    admin_id?: boolean
    superAdmin_id?: boolean
    is_used?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type Approved_AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "approval_code" | "admin_id" | "superAdmin_id" | "is_used" | "createdAt" | "updatedAt", ExtArgs["result"]["approved_Admin"]>
  export type Approved_AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | Approved_Admin$adminArgs<ExtArgs>
    superAdmin?: boolean | AdminDefaultArgs<ExtArgs>
  }
  export type Approved_AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | Approved_Admin$adminArgs<ExtArgs>
    superAdmin?: boolean | AdminDefaultArgs<ExtArgs>
  }
  export type Approved_AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | Approved_Admin$adminArgs<ExtArgs>
    superAdmin?: boolean | AdminDefaultArgs<ExtArgs>
  }

  export type $Approved_AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Approved_Admin"
    objects: {
      admin: Prisma.$UserPayload<ExtArgs> | null
      superAdmin: Prisma.$AdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approval_code: string
      admin_id: string | null
      superAdmin_id: string
      is_used: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["approved_Admin"]>
    composites: {}
  }

  type Approved_AdminGetPayload<S extends boolean | null | undefined | Approved_AdminDefaultArgs> = $Result.GetResult<Prisma.$Approved_AdminPayload, S>

  type Approved_AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Approved_AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Approved_AdminCountAggregateInputType | true
    }

  export interface Approved_AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Approved_Admin'], meta: { name: 'Approved_Admin' } }
    /**
     * Find zero or one Approved_Admin that matches the filter.
     * @param {Approved_AdminFindUniqueArgs} args - Arguments to find a Approved_Admin
     * @example
     * // Get one Approved_Admin
     * const approved_Admin = await prisma.approved_Admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Approved_AdminFindUniqueArgs>(args: SelectSubset<T, Approved_AdminFindUniqueArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Approved_Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Approved_AdminFindUniqueOrThrowArgs} args - Arguments to find a Approved_Admin
     * @example
     * // Get one Approved_Admin
     * const approved_Admin = await prisma.approved_Admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Approved_AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, Approved_AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approved_Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_AdminFindFirstArgs} args - Arguments to find a Approved_Admin
     * @example
     * // Get one Approved_Admin
     * const approved_Admin = await prisma.approved_Admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Approved_AdminFindFirstArgs>(args?: SelectSubset<T, Approved_AdminFindFirstArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approved_Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_AdminFindFirstOrThrowArgs} args - Arguments to find a Approved_Admin
     * @example
     * // Get one Approved_Admin
     * const approved_Admin = await prisma.approved_Admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Approved_AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, Approved_AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Approved_Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Approved_Admins
     * const approved_Admins = await prisma.approved_Admin.findMany()
     * 
     * // Get first 10 Approved_Admins
     * const approved_Admins = await prisma.approved_Admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approved_AdminWithIdOnly = await prisma.approved_Admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Approved_AdminFindManyArgs>(args?: SelectSubset<T, Approved_AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Approved_Admin.
     * @param {Approved_AdminCreateArgs} args - Arguments to create a Approved_Admin.
     * @example
     * // Create one Approved_Admin
     * const Approved_Admin = await prisma.approved_Admin.create({
     *   data: {
     *     // ... data to create a Approved_Admin
     *   }
     * })
     * 
     */
    create<T extends Approved_AdminCreateArgs>(args: SelectSubset<T, Approved_AdminCreateArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Approved_Admins.
     * @param {Approved_AdminCreateManyArgs} args - Arguments to create many Approved_Admins.
     * @example
     * // Create many Approved_Admins
     * const approved_Admin = await prisma.approved_Admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Approved_AdminCreateManyArgs>(args?: SelectSubset<T, Approved_AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Approved_Admins and returns the data saved in the database.
     * @param {Approved_AdminCreateManyAndReturnArgs} args - Arguments to create many Approved_Admins.
     * @example
     * // Create many Approved_Admins
     * const approved_Admin = await prisma.approved_Admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Approved_Admins and only return the `id`
     * const approved_AdminWithIdOnly = await prisma.approved_Admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Approved_AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, Approved_AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Approved_Admin.
     * @param {Approved_AdminDeleteArgs} args - Arguments to delete one Approved_Admin.
     * @example
     * // Delete one Approved_Admin
     * const Approved_Admin = await prisma.approved_Admin.delete({
     *   where: {
     *     // ... filter to delete one Approved_Admin
     *   }
     * })
     * 
     */
    delete<T extends Approved_AdminDeleteArgs>(args: SelectSubset<T, Approved_AdminDeleteArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Approved_Admin.
     * @param {Approved_AdminUpdateArgs} args - Arguments to update one Approved_Admin.
     * @example
     * // Update one Approved_Admin
     * const approved_Admin = await prisma.approved_Admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Approved_AdminUpdateArgs>(args: SelectSubset<T, Approved_AdminUpdateArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Approved_Admins.
     * @param {Approved_AdminDeleteManyArgs} args - Arguments to filter Approved_Admins to delete.
     * @example
     * // Delete a few Approved_Admins
     * const { count } = await prisma.approved_Admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Approved_AdminDeleteManyArgs>(args?: SelectSubset<T, Approved_AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approved_Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Approved_Admins
     * const approved_Admin = await prisma.approved_Admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Approved_AdminUpdateManyArgs>(args: SelectSubset<T, Approved_AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approved_Admins and returns the data updated in the database.
     * @param {Approved_AdminUpdateManyAndReturnArgs} args - Arguments to update many Approved_Admins.
     * @example
     * // Update many Approved_Admins
     * const approved_Admin = await prisma.approved_Admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Approved_Admins and only return the `id`
     * const approved_AdminWithIdOnly = await prisma.approved_Admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Approved_AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, Approved_AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Approved_Admin.
     * @param {Approved_AdminUpsertArgs} args - Arguments to update or create a Approved_Admin.
     * @example
     * // Update or create a Approved_Admin
     * const approved_Admin = await prisma.approved_Admin.upsert({
     *   create: {
     *     // ... data to create a Approved_Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Approved_Admin we want to update
     *   }
     * })
     */
    upsert<T extends Approved_AdminUpsertArgs>(args: SelectSubset<T, Approved_AdminUpsertArgs<ExtArgs>>): Prisma__Approved_AdminClient<$Result.GetResult<Prisma.$Approved_AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Approved_Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_AdminCountArgs} args - Arguments to filter Approved_Admins to count.
     * @example
     * // Count the number of Approved_Admins
     * const count = await prisma.approved_Admin.count({
     *   where: {
     *     // ... the filter for the Approved_Admins we want to count
     *   }
     * })
    **/
    count<T extends Approved_AdminCountArgs>(
      args?: Subset<T, Approved_AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Approved_AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Approved_Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Approved_AdminAggregateArgs>(args: Subset<T, Approved_AdminAggregateArgs>): Prisma.PrismaPromise<GetApproved_AdminAggregateType<T>>

    /**
     * Group by Approved_Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approved_AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Approved_AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Approved_AdminGroupByArgs['orderBy'] }
        : { orderBy?: Approved_AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Approved_AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApproved_AdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Approved_Admin model
   */
  readonly fields: Approved_AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Approved_Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Approved_AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends Approved_Admin$adminArgs<ExtArgs> = {}>(args?: Subset<T, Approved_Admin$adminArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    superAdmin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Approved_Admin model
   */
  interface Approved_AdminFieldRefs {
    readonly id: FieldRef<"Approved_Admin", 'String'>
    readonly approval_code: FieldRef<"Approved_Admin", 'String'>
    readonly admin_id: FieldRef<"Approved_Admin", 'String'>
    readonly superAdmin_id: FieldRef<"Approved_Admin", 'String'>
    readonly is_used: FieldRef<"Approved_Admin", 'Boolean'>
    readonly createdAt: FieldRef<"Approved_Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Approved_Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Approved_Admin findUnique
   */
  export type Approved_AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Admin to fetch.
     */
    where: Approved_AdminWhereUniqueInput
  }

  /**
   * Approved_Admin findUniqueOrThrow
   */
  export type Approved_AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Admin to fetch.
     */
    where: Approved_AdminWhereUniqueInput
  }

  /**
   * Approved_Admin findFirst
   */
  export type Approved_AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Admin to fetch.
     */
    where?: Approved_AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Admins to fetch.
     */
    orderBy?: Approved_AdminOrderByWithRelationInput | Approved_AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Approved_Admins.
     */
    cursor?: Approved_AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Approved_Admins.
     */
    distinct?: Approved_AdminScalarFieldEnum | Approved_AdminScalarFieldEnum[]
  }

  /**
   * Approved_Admin findFirstOrThrow
   */
  export type Approved_AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Admin to fetch.
     */
    where?: Approved_AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Admins to fetch.
     */
    orderBy?: Approved_AdminOrderByWithRelationInput | Approved_AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Approved_Admins.
     */
    cursor?: Approved_AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Approved_Admins.
     */
    distinct?: Approved_AdminScalarFieldEnum | Approved_AdminScalarFieldEnum[]
  }

  /**
   * Approved_Admin findMany
   */
  export type Approved_AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * Filter, which Approved_Admins to fetch.
     */
    where?: Approved_AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Approved_Admins to fetch.
     */
    orderBy?: Approved_AdminOrderByWithRelationInput | Approved_AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Approved_Admins.
     */
    cursor?: Approved_AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Approved_Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Approved_Admins.
     */
    skip?: number
    distinct?: Approved_AdminScalarFieldEnum | Approved_AdminScalarFieldEnum[]
  }

  /**
   * Approved_Admin create
   */
  export type Approved_AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Approved_Admin.
     */
    data: XOR<Approved_AdminCreateInput, Approved_AdminUncheckedCreateInput>
  }

  /**
   * Approved_Admin createMany
   */
  export type Approved_AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Approved_Admins.
     */
    data: Approved_AdminCreateManyInput | Approved_AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Approved_Admin createManyAndReturn
   */
  export type Approved_AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Approved_Admins.
     */
    data: Approved_AdminCreateManyInput | Approved_AdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Approved_Admin update
   */
  export type Approved_AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Approved_Admin.
     */
    data: XOR<Approved_AdminUpdateInput, Approved_AdminUncheckedUpdateInput>
    /**
     * Choose, which Approved_Admin to update.
     */
    where: Approved_AdminWhereUniqueInput
  }

  /**
   * Approved_Admin updateMany
   */
  export type Approved_AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Approved_Admins.
     */
    data: XOR<Approved_AdminUpdateManyMutationInput, Approved_AdminUncheckedUpdateManyInput>
    /**
     * Filter which Approved_Admins to update
     */
    where?: Approved_AdminWhereInput
    /**
     * Limit how many Approved_Admins to update.
     */
    limit?: number
  }

  /**
   * Approved_Admin updateManyAndReturn
   */
  export type Approved_AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * The data used to update Approved_Admins.
     */
    data: XOR<Approved_AdminUpdateManyMutationInput, Approved_AdminUncheckedUpdateManyInput>
    /**
     * Filter which Approved_Admins to update
     */
    where?: Approved_AdminWhereInput
    /**
     * Limit how many Approved_Admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Approved_Admin upsert
   */
  export type Approved_AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Approved_Admin to update in case it exists.
     */
    where: Approved_AdminWhereUniqueInput
    /**
     * In case the Approved_Admin found by the `where` argument doesn't exist, create a new Approved_Admin with this data.
     */
    create: XOR<Approved_AdminCreateInput, Approved_AdminUncheckedCreateInput>
    /**
     * In case the Approved_Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Approved_AdminUpdateInput, Approved_AdminUncheckedUpdateInput>
  }

  /**
   * Approved_Admin delete
   */
  export type Approved_AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
    /**
     * Filter which Approved_Admin to delete.
     */
    where: Approved_AdminWhereUniqueInput
  }

  /**
   * Approved_Admin deleteMany
   */
  export type Approved_AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Approved_Admins to delete
     */
    where?: Approved_AdminWhereInput
    /**
     * Limit how many Approved_Admins to delete.
     */
    limit?: number
  }

  /**
   * Approved_Admin.admin
   */
  export type Approved_Admin$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Approved_Admin without action
   */
  export type Approved_AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Approved_Admin
     */
    select?: Approved_AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Approved_Admin
     */
    omit?: Approved_AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Approved_AdminInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    fullname: 'fullname',
    roles: 'roles',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    manager_id: 'manager_id',
    restricted: 'restricted',
    isVerified: 'isVerified',
    verificationToken: 'verificationToken',
    verificationTokenExpires: 'verificationTokenExpires'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StockTableScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    company: 'company',
    price: 'price',
    changePercent: 'changePercent',
    marketCap: 'marketCap',
    volume: 'volume',
    peRatio: 'peRatio',
    dividendYield: 'dividendYield',
    fiftyTwoWeekLow: 'fiftyTwoWeekLow',
    fiftyTwoWeekHigh: 'fiftyTwoWeekHigh',
    currency: 'currency',
    exchange: 'exchange',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockTableScalarFieldEnum = (typeof StockTableScalarFieldEnum)[keyof typeof StockTableScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const InvestmentScalarFieldEnum: {
    id: 'id',
    portfolio_id: 'portfolio_id',
    stock_id: 'stock_id',
    quantity: 'quantity',
    avgPrice: 'avgPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvestmentScalarFieldEnum = (typeof InvestmentScalarFieldEnum)[keyof typeof InvestmentScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    portfolio_id: 'portfolio_id',
    stock_id: 'stock_id',
    quantity: 'quantity',
    price: 'price',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const Trade_requestScalarFieldEnum: {
    id: 'id',
    portfolio_id: 'portfolio_id',
    stock_id: 'stock_id',
    quantity: 'quantity',
    status: 'status',
    type: 'type',
    approved_by: 'approved_by',
    response: 'response',
    createdAt: 'createdAt'
  };

  export type Trade_requestScalarFieldEnum = (typeof Trade_requestScalarFieldEnum)[keyof typeof Trade_requestScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    user_id: 'user_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const ManagerScalarFieldEnum: {
    id: 'id',
    manager_id: 'manager_id',
    approval_code: 'approval_code',
    client_id: 'client_id',
    manager_slot: 'manager_slot',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ManagerScalarFieldEnum = (typeof ManagerScalarFieldEnum)[keyof typeof ManagerScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    super_admin_access: 'super_admin_access',
    super_admin: 'super_admin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const Approved_ManagerScalarFieldEnum: {
    id: 'id',
    approval_code: 'approval_code',
    user_id: 'user_id',
    admin_id: 'admin_id',
    manager_slot: 'manager_slot',
    is_used: 'is_used',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Approved_ManagerScalarFieldEnum = (typeof Approved_ManagerScalarFieldEnum)[keyof typeof Approved_ManagerScalarFieldEnum]


  export const Approved_AdminScalarFieldEnum: {
    id: 'id',
    approval_code: 'approval_code',
    admin_id: 'admin_id',
    superAdmin_id: 'superAdmin_id',
    is_used: 'is_used',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Approved_AdminScalarFieldEnum = (typeof Approved_AdminScalarFieldEnum)[keyof typeof Approved_AdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Roles'
   */
  export type EnumRolesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Roles'>
    


  /**
   * Reference to a field of type 'Roles[]'
   */
  export type ListEnumRolesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Roles[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    fullname?: StringFilter<"User"> | string
    roles?: EnumRolesFilter<"User"> | $Enums.Roles
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    manager_id?: StringNullableFilter<"User"> | string | null
    restricted?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    verificationTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    portfolio?: PortfolioListRelationFilter
    refreshToken?: RefreshTokenListRelationFilter
    manager?: XOR<ManagerNullableScalarRelationFilter, ManagerWhereInput> | null
    client_manager?: XOR<ManagerNullableScalarRelationFilter, ManagerWhereInput> | null
    to_admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    add_admin?: XOR<Approved_AdminNullableScalarRelationFilter, Approved_AdminWhereInput> | null
    Approved_Manager?: XOR<Approved_ManagerNullableScalarRelationFilter, Approved_ManagerWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    manager_id?: SortOrderInput | SortOrder
    restricted?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    verificationTokenExpires?: SortOrderInput | SortOrder
    portfolio?: PortfolioOrderByRelationAggregateInput
    refreshToken?: RefreshTokenOrderByRelationAggregateInput
    manager?: ManagerOrderByWithRelationInput
    client_manager?: ManagerOrderByWithRelationInput
    to_admin?: AdminOrderByWithRelationInput
    add_admin?: Approved_AdminOrderByWithRelationInput
    Approved_Manager?: Approved_ManagerOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    fullname?: StringFilter<"User"> | string
    roles?: EnumRolesFilter<"User"> | $Enums.Roles
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    manager_id?: StringNullableFilter<"User"> | string | null
    restricted?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    verificationTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    portfolio?: PortfolioListRelationFilter
    refreshToken?: RefreshTokenListRelationFilter
    manager?: XOR<ManagerNullableScalarRelationFilter, ManagerWhereInput> | null
    client_manager?: XOR<ManagerNullableScalarRelationFilter, ManagerWhereInput> | null
    to_admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    add_admin?: XOR<Approved_AdminNullableScalarRelationFilter, Approved_AdminWhereInput> | null
    Approved_Manager?: XOR<Approved_ManagerNullableScalarRelationFilter, Approved_ManagerWhereInput> | null
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    manager_id?: SortOrderInput | SortOrder
    restricted?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    verificationTokenExpires?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    fullname?: StringWithAggregatesFilter<"User"> | string
    roles?: EnumRolesWithAggregatesFilter<"User"> | $Enums.Roles
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    manager_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    restricted?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    verificationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    verificationTokenExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type StockTableWhereInput = {
    AND?: StockTableWhereInput | StockTableWhereInput[]
    OR?: StockTableWhereInput[]
    NOT?: StockTableWhereInput | StockTableWhereInput[]
    id?: StringFilter<"StockTable"> | string
    symbol?: StringFilter<"StockTable"> | string
    company?: StringFilter<"StockTable"> | string
    price?: DecimalFilter<"StockTable"> | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    marketCap?: BigIntNullableFilter<"StockTable"> | bigint | number | null
    volume?: StringNullableFilter<"StockTable"> | string | null
    peRatio?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    dividendYield?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"StockTable"> | string
    exchange?: StringNullableFilter<"StockTable"> | string | null
    lastUpdated?: DateTimeNullableFilter<"StockTable"> | Date | string | null
    createdAt?: DateTimeFilter<"StockTable"> | Date | string
    updatedAt?: DateTimeFilter<"StockTable"> | Date | string
    investment?: InvestmentListRelationFilter
    transaction?: TransactionListRelationFilter
    trade_request?: Trade_requestListRelationFilter
  }

  export type StockTableOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    company?: SortOrder
    price?: SortOrder
    changePercent?: SortOrderInput | SortOrder
    marketCap?: SortOrderInput | SortOrder
    volume?: SortOrderInput | SortOrder
    peRatio?: SortOrderInput | SortOrder
    dividendYield?: SortOrderInput | SortOrder
    fiftyTwoWeekLow?: SortOrderInput | SortOrder
    fiftyTwoWeekHigh?: SortOrderInput | SortOrder
    currency?: SortOrder
    exchange?: SortOrderInput | SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    investment?: InvestmentOrderByRelationAggregateInput
    transaction?: TransactionOrderByRelationAggregateInput
    trade_request?: Trade_requestOrderByRelationAggregateInput
  }

  export type StockTableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    symbol?: string
    AND?: StockTableWhereInput | StockTableWhereInput[]
    OR?: StockTableWhereInput[]
    NOT?: StockTableWhereInput | StockTableWhereInput[]
    company?: StringFilter<"StockTable"> | string
    price?: DecimalFilter<"StockTable"> | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    marketCap?: BigIntNullableFilter<"StockTable"> | bigint | number | null
    volume?: StringNullableFilter<"StockTable"> | string | null
    peRatio?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    dividendYield?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: DecimalNullableFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"StockTable"> | string
    exchange?: StringNullableFilter<"StockTable"> | string | null
    lastUpdated?: DateTimeNullableFilter<"StockTable"> | Date | string | null
    createdAt?: DateTimeFilter<"StockTable"> | Date | string
    updatedAt?: DateTimeFilter<"StockTable"> | Date | string
    investment?: InvestmentListRelationFilter
    transaction?: TransactionListRelationFilter
    trade_request?: Trade_requestListRelationFilter
  }, "id" | "symbol">

  export type StockTableOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    company?: SortOrder
    price?: SortOrder
    changePercent?: SortOrderInput | SortOrder
    marketCap?: SortOrderInput | SortOrder
    volume?: SortOrderInput | SortOrder
    peRatio?: SortOrderInput | SortOrder
    dividendYield?: SortOrderInput | SortOrder
    fiftyTwoWeekLow?: SortOrderInput | SortOrder
    fiftyTwoWeekHigh?: SortOrderInput | SortOrder
    currency?: SortOrder
    exchange?: SortOrderInput | SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockTableCountOrderByAggregateInput
    _avg?: StockTableAvgOrderByAggregateInput
    _max?: StockTableMaxOrderByAggregateInput
    _min?: StockTableMinOrderByAggregateInput
    _sum?: StockTableSumOrderByAggregateInput
  }

  export type StockTableScalarWhereWithAggregatesInput = {
    AND?: StockTableScalarWhereWithAggregatesInput | StockTableScalarWhereWithAggregatesInput[]
    OR?: StockTableScalarWhereWithAggregatesInput[]
    NOT?: StockTableScalarWhereWithAggregatesInput | StockTableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockTable"> | string
    symbol?: StringWithAggregatesFilter<"StockTable"> | string
    company?: StringWithAggregatesFilter<"StockTable"> | string
    price?: DecimalWithAggregatesFilter<"StockTable"> | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalNullableWithAggregatesFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    marketCap?: BigIntNullableWithAggregatesFilter<"StockTable"> | bigint | number | null
    volume?: StringNullableWithAggregatesFilter<"StockTable"> | string | null
    peRatio?: DecimalNullableWithAggregatesFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    dividendYield?: DecimalNullableWithAggregatesFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: DecimalNullableWithAggregatesFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: DecimalNullableWithAggregatesFilter<"StockTable"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringWithAggregatesFilter<"StockTable"> | string
    exchange?: StringNullableWithAggregatesFilter<"StockTable"> | string | null
    lastUpdated?: DateTimeNullableWithAggregatesFilter<"StockTable"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StockTable"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StockTable"> | Date | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    user_id?: StringFilter<"Portfolio"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    investment?: InvestmentListRelationFilter
    transaction?: TransactionListRelationFilter
    trade_request?: Trade_requestListRelationFilter
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    user?: UserOrderByWithRelationInput
    investment?: InvestmentOrderByRelationAggregateInput
    transaction?: TransactionOrderByRelationAggregateInput
    trade_request?: Trade_requestOrderByRelationAggregateInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    user_id?: StringFilter<"Portfolio"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    investment?: InvestmentListRelationFilter
    transaction?: TransactionListRelationFilter
    trade_request?: Trade_requestListRelationFilter
  }, "id">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Portfolio"> | string
    user_id?: StringWithAggregatesFilter<"Portfolio"> | string
  }

  export type InvestmentWhereInput = {
    AND?: InvestmentWhereInput | InvestmentWhereInput[]
    OR?: InvestmentWhereInput[]
    NOT?: InvestmentWhereInput | InvestmentWhereInput[]
    id?: StringFilter<"Investment"> | string
    portfolio_id?: StringFilter<"Investment"> | string
    stock_id?: StringFilter<"Investment"> | string
    quantity?: IntFilter<"Investment"> | number
    avgPrice?: DecimalFilter<"Investment"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    updatedAt?: DateTimeFilter<"Investment"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    stock?: XOR<StockTableScalarRelationFilter, StockTableWhereInput>
  }

  export type InvestmentOrderByWithRelationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    avgPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    portfolio?: PortfolioOrderByWithRelationInput
    stock?: StockTableOrderByWithRelationInput
  }

  export type InvestmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    portfolio_id_stock_id?: InvestmentPortfolio_idStock_idCompoundUniqueInput
    AND?: InvestmentWhereInput | InvestmentWhereInput[]
    OR?: InvestmentWhereInput[]
    NOT?: InvestmentWhereInput | InvestmentWhereInput[]
    portfolio_id?: StringFilter<"Investment"> | string
    stock_id?: StringFilter<"Investment"> | string
    quantity?: IntFilter<"Investment"> | number
    avgPrice?: DecimalFilter<"Investment"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    updatedAt?: DateTimeFilter<"Investment"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    stock?: XOR<StockTableScalarRelationFilter, StockTableWhereInput>
  }, "id" | "portfolio_id_stock_id">

  export type InvestmentOrderByWithAggregationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    avgPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvestmentCountOrderByAggregateInput
    _avg?: InvestmentAvgOrderByAggregateInput
    _max?: InvestmentMaxOrderByAggregateInput
    _min?: InvestmentMinOrderByAggregateInput
    _sum?: InvestmentSumOrderByAggregateInput
  }

  export type InvestmentScalarWhereWithAggregatesInput = {
    AND?: InvestmentScalarWhereWithAggregatesInput | InvestmentScalarWhereWithAggregatesInput[]
    OR?: InvestmentScalarWhereWithAggregatesInput[]
    NOT?: InvestmentScalarWhereWithAggregatesInput | InvestmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Investment"> | string
    portfolio_id?: StringWithAggregatesFilter<"Investment"> | string
    stock_id?: StringWithAggregatesFilter<"Investment"> | string
    quantity?: IntWithAggregatesFilter<"Investment"> | number
    avgPrice?: DecimalWithAggregatesFilter<"Investment"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Investment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Investment"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    portfolio_id?: StringFilter<"Transaction"> | string
    stock_id?: StringFilter<"Transaction"> | string
    quantity?: IntFilter<"Transaction"> | number
    price?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    stock?: XOR<StockTableScalarRelationFilter, StockTableWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    portfolio?: PortfolioOrderByWithRelationInput
    stock?: StockTableOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    portfolio_id?: StringFilter<"Transaction"> | string
    stock_id?: StringFilter<"Transaction"> | string
    quantity?: IntFilter<"Transaction"> | number
    price?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    stock?: XOR<StockTableScalarRelationFilter, StockTableWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    portfolio_id?: StringWithAggregatesFilter<"Transaction"> | string
    stock_id?: StringWithAggregatesFilter<"Transaction"> | string
    quantity?: IntWithAggregatesFilter<"Transaction"> | number
    price?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type Trade_requestWhereInput = {
    AND?: Trade_requestWhereInput | Trade_requestWhereInput[]
    OR?: Trade_requestWhereInput[]
    NOT?: Trade_requestWhereInput | Trade_requestWhereInput[]
    id?: StringFilter<"Trade_request"> | string
    portfolio_id?: StringFilter<"Trade_request"> | string
    stock_id?: StringFilter<"Trade_request"> | string
    quantity?: IntFilter<"Trade_request"> | number
    status?: EnumStatusFilter<"Trade_request"> | $Enums.Status
    type?: EnumTransactionTypeFilter<"Trade_request"> | $Enums.TransactionType
    approved_by?: StringNullableFilter<"Trade_request"> | string | null
    response?: StringNullableFilter<"Trade_request"> | string | null
    createdAt?: DateTimeFilter<"Trade_request"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    stock?: XOR<StockTableScalarRelationFilter, StockTableWhereInput>
    approved?: XOR<ManagerNullableScalarRelationFilter, ManagerWhereInput> | null
  }

  export type Trade_requestOrderByWithRelationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    type?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    response?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    portfolio?: PortfolioOrderByWithRelationInput
    stock?: StockTableOrderByWithRelationInput
    approved?: ManagerOrderByWithRelationInput
  }

  export type Trade_requestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Trade_requestWhereInput | Trade_requestWhereInput[]
    OR?: Trade_requestWhereInput[]
    NOT?: Trade_requestWhereInput | Trade_requestWhereInput[]
    portfolio_id?: StringFilter<"Trade_request"> | string
    stock_id?: StringFilter<"Trade_request"> | string
    quantity?: IntFilter<"Trade_request"> | number
    status?: EnumStatusFilter<"Trade_request"> | $Enums.Status
    type?: EnumTransactionTypeFilter<"Trade_request"> | $Enums.TransactionType
    approved_by?: StringNullableFilter<"Trade_request"> | string | null
    response?: StringNullableFilter<"Trade_request"> | string | null
    createdAt?: DateTimeFilter<"Trade_request"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    stock?: XOR<StockTableScalarRelationFilter, StockTableWhereInput>
    approved?: XOR<ManagerNullableScalarRelationFilter, ManagerWhereInput> | null
  }, "id">

  export type Trade_requestOrderByWithAggregationInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    type?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    response?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: Trade_requestCountOrderByAggregateInput
    _avg?: Trade_requestAvgOrderByAggregateInput
    _max?: Trade_requestMaxOrderByAggregateInput
    _min?: Trade_requestMinOrderByAggregateInput
    _sum?: Trade_requestSumOrderByAggregateInput
  }

  export type Trade_requestScalarWhereWithAggregatesInput = {
    AND?: Trade_requestScalarWhereWithAggregatesInput | Trade_requestScalarWhereWithAggregatesInput[]
    OR?: Trade_requestScalarWhereWithAggregatesInput[]
    NOT?: Trade_requestScalarWhereWithAggregatesInput | Trade_requestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade_request"> | string
    portfolio_id?: StringWithAggregatesFilter<"Trade_request"> | string
    stock_id?: StringWithAggregatesFilter<"Trade_request"> | string
    quantity?: IntWithAggregatesFilter<"Trade_request"> | number
    status?: EnumStatusWithAggregatesFilter<"Trade_request"> | $Enums.Status
    type?: EnumTransactionTypeWithAggregatesFilter<"Trade_request"> | $Enums.TransactionType
    approved_by?: StringNullableWithAggregatesFilter<"Trade_request"> | string | null
    response?: StringNullableWithAggregatesFilter<"Trade_request"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Trade_request"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    user_id?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    user_id?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    user_id?: StringWithAggregatesFilter<"RefreshToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type ManagerWhereInput = {
    AND?: ManagerWhereInput | ManagerWhereInput[]
    OR?: ManagerWhereInput[]
    NOT?: ManagerWhereInput | ManagerWhereInput[]
    id?: StringFilter<"Manager"> | string
    manager_id?: StringFilter<"Manager"> | string
    approval_code?: StringFilter<"Manager"> | string
    client_id?: StringNullableFilter<"Manager"> | string | null
    manager_slot?: IntFilter<"Manager"> | number
    createdAt?: DateTimeFilter<"Manager"> | Date | string
    updatedAt?: DateTimeFilter<"Manager"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    managed_by?: UserListRelationFilter
    approvedBy?: Trade_requestListRelationFilter
  }

  export type ManagerOrderByWithRelationInput = {
    id?: SortOrder
    manager_id?: SortOrder
    approval_code?: SortOrder
    client_id?: SortOrderInput | SortOrder
    manager_slot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    managed_by?: UserOrderByRelationAggregateInput
    approvedBy?: Trade_requestOrderByRelationAggregateInput
  }

  export type ManagerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    manager_id?: string
    approval_code?: string
    AND?: ManagerWhereInput | ManagerWhereInput[]
    OR?: ManagerWhereInput[]
    NOT?: ManagerWhereInput | ManagerWhereInput[]
    client_id?: StringNullableFilter<"Manager"> | string | null
    manager_slot?: IntFilter<"Manager"> | number
    createdAt?: DateTimeFilter<"Manager"> | Date | string
    updatedAt?: DateTimeFilter<"Manager"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    managed_by?: UserListRelationFilter
    approvedBy?: Trade_requestListRelationFilter
  }, "id" | "manager_id" | "approval_code">

  export type ManagerOrderByWithAggregationInput = {
    id?: SortOrder
    manager_id?: SortOrder
    approval_code?: SortOrder
    client_id?: SortOrderInput | SortOrder
    manager_slot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ManagerCountOrderByAggregateInput
    _avg?: ManagerAvgOrderByAggregateInput
    _max?: ManagerMaxOrderByAggregateInput
    _min?: ManagerMinOrderByAggregateInput
    _sum?: ManagerSumOrderByAggregateInput
  }

  export type ManagerScalarWhereWithAggregatesInput = {
    AND?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[]
    OR?: ManagerScalarWhereWithAggregatesInput[]
    NOT?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Manager"> | string
    manager_id?: StringWithAggregatesFilter<"Manager"> | string
    approval_code?: StringWithAggregatesFilter<"Manager"> | string
    client_id?: StringNullableWithAggregatesFilter<"Manager"> | string | null
    manager_slot?: IntWithAggregatesFilter<"Manager"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Manager"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Manager"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    user_id?: StringFilter<"Admin"> | string
    super_admin_access?: StringNullableFilter<"Admin"> | string | null
    super_admin?: BoolFilter<"Admin"> | boolean
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin_id?: Approved_ManagerListRelationFilter
    super_admin_id?: Approved_AdminListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    super_admin_access?: SortOrderInput | SortOrder
    super_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    admin_id?: Approved_ManagerOrderByRelationAggregateInput
    super_admin_id?: Approved_AdminOrderByRelationAggregateInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    super_admin_access?: StringNullableFilter<"Admin"> | string | null
    super_admin?: BoolFilter<"Admin"> | boolean
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin_id?: Approved_ManagerListRelationFilter
    super_admin_id?: Approved_AdminListRelationFilter
  }, "id" | "user_id">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    super_admin_access?: SortOrderInput | SortOrder
    super_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    user_id?: StringWithAggregatesFilter<"Admin"> | string
    super_admin_access?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    super_admin?: BoolWithAggregatesFilter<"Admin"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type Approved_ManagerWhereInput = {
    AND?: Approved_ManagerWhereInput | Approved_ManagerWhereInput[]
    OR?: Approved_ManagerWhereInput[]
    NOT?: Approved_ManagerWhereInput | Approved_ManagerWhereInput[]
    id?: StringFilter<"Approved_Manager"> | string
    approval_code?: StringFilter<"Approved_Manager"> | string
    user_id?: StringFilter<"Approved_Manager"> | string
    admin_id?: StringFilter<"Approved_Manager"> | string
    manager_slot?: IntFilter<"Approved_Manager"> | number
    is_used?: BoolFilter<"Approved_Manager"> | boolean
    createdAt?: DateTimeFilter<"Approved_Manager"> | Date | string
    updatedAt?: DateTimeFilter<"Approved_Manager"> | Date | string
    manager?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin?: XOR<AdminScalarRelationFilter, AdminWhereInput>
  }

  export type Approved_ManagerOrderByWithRelationInput = {
    id?: SortOrder
    approval_code?: SortOrder
    user_id?: SortOrder
    admin_id?: SortOrder
    manager_slot?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    manager?: UserOrderByWithRelationInput
    admin?: AdminOrderByWithRelationInput
  }

  export type Approved_ManagerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approval_code?: string
    user_id?: string
    AND?: Approved_ManagerWhereInput | Approved_ManagerWhereInput[]
    OR?: Approved_ManagerWhereInput[]
    NOT?: Approved_ManagerWhereInput | Approved_ManagerWhereInput[]
    admin_id?: StringFilter<"Approved_Manager"> | string
    manager_slot?: IntFilter<"Approved_Manager"> | number
    is_used?: BoolFilter<"Approved_Manager"> | boolean
    createdAt?: DateTimeFilter<"Approved_Manager"> | Date | string
    updatedAt?: DateTimeFilter<"Approved_Manager"> | Date | string
    manager?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin?: XOR<AdminScalarRelationFilter, AdminWhereInput>
  }, "id" | "approval_code" | "user_id">

  export type Approved_ManagerOrderByWithAggregationInput = {
    id?: SortOrder
    approval_code?: SortOrder
    user_id?: SortOrder
    admin_id?: SortOrder
    manager_slot?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: Approved_ManagerCountOrderByAggregateInput
    _avg?: Approved_ManagerAvgOrderByAggregateInput
    _max?: Approved_ManagerMaxOrderByAggregateInput
    _min?: Approved_ManagerMinOrderByAggregateInput
    _sum?: Approved_ManagerSumOrderByAggregateInput
  }

  export type Approved_ManagerScalarWhereWithAggregatesInput = {
    AND?: Approved_ManagerScalarWhereWithAggregatesInput | Approved_ManagerScalarWhereWithAggregatesInput[]
    OR?: Approved_ManagerScalarWhereWithAggregatesInput[]
    NOT?: Approved_ManagerScalarWhereWithAggregatesInput | Approved_ManagerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Approved_Manager"> | string
    approval_code?: StringWithAggregatesFilter<"Approved_Manager"> | string
    user_id?: StringWithAggregatesFilter<"Approved_Manager"> | string
    admin_id?: StringWithAggregatesFilter<"Approved_Manager"> | string
    manager_slot?: IntWithAggregatesFilter<"Approved_Manager"> | number
    is_used?: BoolWithAggregatesFilter<"Approved_Manager"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Approved_Manager"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Approved_Manager"> | Date | string
  }

  export type Approved_AdminWhereInput = {
    AND?: Approved_AdminWhereInput | Approved_AdminWhereInput[]
    OR?: Approved_AdminWhereInput[]
    NOT?: Approved_AdminWhereInput | Approved_AdminWhereInput[]
    id?: StringFilter<"Approved_Admin"> | string
    approval_code?: StringFilter<"Approved_Admin"> | string
    admin_id?: StringNullableFilter<"Approved_Admin"> | string | null
    superAdmin_id?: StringFilter<"Approved_Admin"> | string
    is_used?: BoolFilter<"Approved_Admin"> | boolean
    createdAt?: DateTimeFilter<"Approved_Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Approved_Admin"> | Date | string
    admin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    superAdmin?: XOR<AdminScalarRelationFilter, AdminWhereInput>
  }

  export type Approved_AdminOrderByWithRelationInput = {
    id?: SortOrder
    approval_code?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    superAdmin_id?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    admin?: UserOrderByWithRelationInput
    superAdmin?: AdminOrderByWithRelationInput
  }

  export type Approved_AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approval_code?: string
    admin_id?: string
    AND?: Approved_AdminWhereInput | Approved_AdminWhereInput[]
    OR?: Approved_AdminWhereInput[]
    NOT?: Approved_AdminWhereInput | Approved_AdminWhereInput[]
    superAdmin_id?: StringFilter<"Approved_Admin"> | string
    is_used?: BoolFilter<"Approved_Admin"> | boolean
    createdAt?: DateTimeFilter<"Approved_Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Approved_Admin"> | Date | string
    admin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    superAdmin?: XOR<AdminScalarRelationFilter, AdminWhereInput>
  }, "id" | "approval_code" | "admin_id">

  export type Approved_AdminOrderByWithAggregationInput = {
    id?: SortOrder
    approval_code?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    superAdmin_id?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: Approved_AdminCountOrderByAggregateInput
    _max?: Approved_AdminMaxOrderByAggregateInput
    _min?: Approved_AdminMinOrderByAggregateInput
  }

  export type Approved_AdminScalarWhereWithAggregatesInput = {
    AND?: Approved_AdminScalarWhereWithAggregatesInput | Approved_AdminScalarWhereWithAggregatesInput[]
    OR?: Approved_AdminScalarWhereWithAggregatesInput[]
    NOT?: Approved_AdminScalarWhereWithAggregatesInput | Approved_AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Approved_Admin"> | string
    approval_code?: StringWithAggregatesFilter<"Approved_Admin"> | string
    admin_id?: StringNullableWithAggregatesFilter<"Approved_Admin"> | string | null
    superAdmin_id?: StringWithAggregatesFilter<"Approved_Admin"> | string
    is_used?: BoolWithAggregatesFilter<"Approved_Admin"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Approved_Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Approved_Admin"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    manager?: ManagerCreateNestedOneWithoutUserInput
    client_manager?: ManagerCreateNestedOneWithoutManaged_byInput
    to_admin?: AdminCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerCreateNestedOneWithoutManagerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    manager?: ManagerUncheckedCreateNestedOneWithoutUserInput
    to_admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminUncheckedCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    manager?: ManagerUpdateOneWithoutUserNestedInput
    client_manager?: ManagerUpdateOneWithoutManaged_byNestedInput
    to_admin?: AdminUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    manager?: ManagerUncheckedUpdateOneWithoutUserNestedInput
    to_admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StockTableCreateInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    investment?: InvestmentCreateNestedManyWithoutStockInput
    transaction?: TransactionCreateNestedManyWithoutStockInput
    trade_request?: Trade_requestCreateNestedManyWithoutStockInput
  }

  export type StockTableUncheckedCreateInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    investment?: InvestmentUncheckedCreateNestedManyWithoutStockInput
    transaction?: TransactionUncheckedCreateNestedManyWithoutStockInput
    trade_request?: Trade_requestUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockTableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investment?: InvestmentUpdateManyWithoutStockNestedInput
    transaction?: TransactionUpdateManyWithoutStockNestedInput
    trade_request?: Trade_requestUpdateManyWithoutStockNestedInput
  }

  export type StockTableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investment?: InvestmentUncheckedUpdateManyWithoutStockNestedInput
    transaction?: TransactionUncheckedUpdateManyWithoutStockNestedInput
    trade_request?: Trade_requestUncheckedUpdateManyWithoutStockNestedInput
  }

  export type StockTableCreateManyInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockTableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockTableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutPortfolioInput
    investment?: InvestmentCreateNestedManyWithoutPortfolioInput
    transaction?: TransactionCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    user_id: string
    investment?: InvestmentUncheckedCreateNestedManyWithoutPortfolioInput
    transaction?: TransactionUncheckedCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPortfolioNestedInput
    investment?: InvestmentUpdateManyWithoutPortfolioNestedInput
    transaction?: TransactionUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    investment?: InvestmentUncheckedUpdateManyWithoutPortfolioNestedInput
    transaction?: TransactionUncheckedUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioCreateManyInput = {
    id?: string
    user_id: string
  }

  export type PortfolioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type InvestmentCreateInput = {
    id?: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutInvestmentInput
    stock: StockTableCreateNestedOneWithoutInvestmentInput
  }

  export type InvestmentUncheckedCreateInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutInvestmentNestedInput
    stock?: StockTableUpdateOneRequiredWithoutInvestmentNestedInput
  }

  export type InvestmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentCreateManyInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutTransactionInput
    stock: StockTableCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutTransactionNestedInput
    stock?: StockTableUpdateOneRequiredWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestCreateInput = {
    id?: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    response?: string | null
    createdAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutTrade_requestInput
    stock: StockTableCreateNestedOneWithoutTrade_requestInput
    approved?: ManagerCreateNestedOneWithoutApprovedByInput
  }

  export type Trade_requestUncheckedCreateInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    approved_by?: string | null
    response?: string | null
    createdAt?: Date | string
  }

  export type Trade_requestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutTrade_requestNestedInput
    stock?: StockTableUpdateOneRequiredWithoutTrade_requestNestedInput
    approved?: ManagerUpdateOneWithoutApprovedByNestedInput
  }

  export type Trade_requestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestCreateManyInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    approved_by?: string | null
    response?: string | null
    createdAt?: Date | string
  }

  export type Trade_requestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokenInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    user_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokenNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    user_id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagerCreateInput = {
    id?: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutManagerInput
    managed_by?: UserCreateNestedManyWithoutClient_managerInput
    approvedBy?: Trade_requestCreateNestedManyWithoutApprovedInput
  }

  export type ManagerUncheckedCreateInput = {
    id?: string
    manager_id: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    managed_by?: UserUncheckedCreateNestedManyWithoutClient_managerInput
    approvedBy?: Trade_requestUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type ManagerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutManagerNestedInput
    managed_by?: UserUpdateManyWithoutClient_managerNestedInput
    approvedBy?: Trade_requestUpdateManyWithoutApprovedNestedInput
  }

  export type ManagerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    manager_id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managed_by?: UserUncheckedUpdateManyWithoutClient_managerNestedInput
    approvedBy?: Trade_requestUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type ManagerCreateManyInput = {
    id?: string
    manager_id: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManagerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    manager_id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    id?: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTo_adminInput
    admin_id?: Approved_ManagerCreateNestedManyWithoutAdminInput
    super_admin_id?: Approved_AdminCreateNestedManyWithoutSuperAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    user_id: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin_id?: Approved_ManagerUncheckedCreateNestedManyWithoutAdminInput
    super_admin_id?: Approved_AdminUncheckedCreateNestedManyWithoutSuperAdminInput
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTo_adminNestedInput
    admin_id?: Approved_ManagerUpdateManyWithoutAdminNestedInput
    super_admin_id?: Approved_AdminUpdateManyWithoutSuperAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: Approved_ManagerUncheckedUpdateManyWithoutAdminNestedInput
    super_admin_id?: Approved_AdminUncheckedUpdateManyWithoutSuperAdminNestedInput
  }

  export type AdminCreateManyInput = {
    id?: string
    user_id: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_ManagerCreateInput = {
    id?: string
    approval_code: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    manager: UserCreateNestedOneWithoutApproved_ManagerInput
    admin: AdminCreateNestedOneWithoutAdmin_idInput
  }

  export type Approved_ManagerUncheckedCreateInput = {
    id?: string
    approval_code: string
    user_id: string
    admin_id: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_ManagerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneRequiredWithoutApproved_ManagerNestedInput
    admin?: AdminUpdateOneRequiredWithoutAdmin_idNestedInput
  }

  export type Approved_ManagerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_ManagerCreateManyInput = {
    id?: string
    approval_code: string
    user_id: string
    admin_id: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_ManagerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_ManagerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_AdminCreateInput = {
    id?: string
    approval_code: string
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin?: UserCreateNestedOneWithoutAdd_adminInput
    superAdmin: AdminCreateNestedOneWithoutSuper_admin_idInput
  }

  export type Approved_AdminUncheckedCreateInput = {
    id?: string
    approval_code: string
    admin_id?: string | null
    superAdmin_id: string
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneWithoutAdd_adminNestedInput
    superAdmin?: AdminUpdateOneRequiredWithoutSuper_admin_idNestedInput
  }

  export type Approved_AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    superAdmin_id?: StringFieldUpdateOperationsInput | string
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_AdminCreateManyInput = {
    id?: string
    approval_code: string
    admin_id?: string | null
    superAdmin_id: string
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    superAdmin_id?: StringFieldUpdateOperationsInput | string
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRolesFilter<$PrismaModel = never> = {
    equals?: $Enums.Roles | EnumRolesFieldRefInput<$PrismaModel>
    in?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumRolesFilter<$PrismaModel> | $Enums.Roles
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type ManagerNullableScalarRelationFilter = {
    is?: ManagerWhereInput | null
    isNot?: ManagerWhereInput | null
  }

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type Approved_AdminNullableScalarRelationFilter = {
    is?: Approved_AdminWhereInput | null
    isNot?: Approved_AdminWhereInput | null
  }

  export type Approved_ManagerNullableScalarRelationFilter = {
    is?: Approved_ManagerWhereInput | null
    isNot?: Approved_ManagerWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    manager_id?: SortOrder
    restricted?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrder
    verificationTokenExpires?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    manager_id?: SortOrder
    restricted?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrder
    verificationTokenExpires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    manager_id?: SortOrder
    restricted?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrder
    verificationTokenExpires?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRolesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Roles | EnumRolesFieldRefInput<$PrismaModel>
    in?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumRolesWithAggregatesFilter<$PrismaModel> | $Enums.Roles
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolesFilter<$PrismaModel>
    _max?: NestedEnumRolesFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type InvestmentListRelationFilter = {
    every?: InvestmentWhereInput
    some?: InvestmentWhereInput
    none?: InvestmentWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type Trade_requestListRelationFilter = {
    every?: Trade_requestWhereInput
    some?: Trade_requestWhereInput
    none?: Trade_requestWhereInput
  }

  export type InvestmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Trade_requestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockTableCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    company?: SortOrder
    price?: SortOrder
    changePercent?: SortOrder
    marketCap?: SortOrder
    volume?: SortOrder
    peRatio?: SortOrder
    dividendYield?: SortOrder
    fiftyTwoWeekLow?: SortOrder
    fiftyTwoWeekHigh?: SortOrder
    currency?: SortOrder
    exchange?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockTableAvgOrderByAggregateInput = {
    price?: SortOrder
    changePercent?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    dividendYield?: SortOrder
    fiftyTwoWeekLow?: SortOrder
    fiftyTwoWeekHigh?: SortOrder
  }

  export type StockTableMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    company?: SortOrder
    price?: SortOrder
    changePercent?: SortOrder
    marketCap?: SortOrder
    volume?: SortOrder
    peRatio?: SortOrder
    dividendYield?: SortOrder
    fiftyTwoWeekLow?: SortOrder
    fiftyTwoWeekHigh?: SortOrder
    currency?: SortOrder
    exchange?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockTableMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    company?: SortOrder
    price?: SortOrder
    changePercent?: SortOrder
    marketCap?: SortOrder
    volume?: SortOrder
    peRatio?: SortOrder
    dividendYield?: SortOrder
    fiftyTwoWeekLow?: SortOrder
    fiftyTwoWeekHigh?: SortOrder
    currency?: SortOrder
    exchange?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockTableSumOrderByAggregateInput = {
    price?: SortOrder
    changePercent?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    dividendYield?: SortOrder
    fiftyTwoWeekLow?: SortOrder
    fiftyTwoWeekHigh?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PortfolioScalarRelationFilter = {
    is?: PortfolioWhereInput
    isNot?: PortfolioWhereInput
  }

  export type StockTableScalarRelationFilter = {
    is?: StockTableWhereInput
    isNot?: StockTableWhereInput
  }

  export type InvestmentPortfolio_idStock_idCompoundUniqueInput = {
    portfolio_id: string
    stock_id: string
  }

  export type InvestmentCountOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    avgPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestmentAvgOrderByAggregateInput = {
    quantity?: SortOrder
    avgPrice?: SortOrder
  }

  export type InvestmentMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    avgPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestmentMinOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    avgPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvestmentSumOrderByAggregateInput = {
    quantity?: SortOrder
    avgPrice?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type Trade_requestCountOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    type?: SortOrder
    approved_by?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
  }

  export type Trade_requestAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type Trade_requestMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    type?: SortOrder
    approved_by?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
  }

  export type Trade_requestMinOrderByAggregateInput = {
    id?: SortOrder
    portfolio_id?: SortOrder
    stock_id?: SortOrder
    quantity?: SortOrder
    status?: SortOrder
    type?: SortOrder
    approved_by?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
  }

  export type Trade_requestSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ManagerCountOrderByAggregateInput = {
    id?: SortOrder
    manager_id?: SortOrder
    approval_code?: SortOrder
    client_id?: SortOrder
    manager_slot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ManagerAvgOrderByAggregateInput = {
    manager_slot?: SortOrder
  }

  export type ManagerMaxOrderByAggregateInput = {
    id?: SortOrder
    manager_id?: SortOrder
    approval_code?: SortOrder
    client_id?: SortOrder
    manager_slot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ManagerMinOrderByAggregateInput = {
    id?: SortOrder
    manager_id?: SortOrder
    approval_code?: SortOrder
    client_id?: SortOrder
    manager_slot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ManagerSumOrderByAggregateInput = {
    manager_slot?: SortOrder
  }

  export type Approved_ManagerListRelationFilter = {
    every?: Approved_ManagerWhereInput
    some?: Approved_ManagerWhereInput
    none?: Approved_ManagerWhereInput
  }

  export type Approved_AdminListRelationFilter = {
    every?: Approved_AdminWhereInput
    some?: Approved_AdminWhereInput
    none?: Approved_AdminWhereInput
  }

  export type Approved_ManagerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Approved_AdminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    super_admin_access?: SortOrder
    super_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    super_admin_access?: SortOrder
    super_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    super_admin_access?: SortOrder
    super_admin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminScalarRelationFilter = {
    is?: AdminWhereInput
    isNot?: AdminWhereInput
  }

  export type Approved_ManagerCountOrderByAggregateInput = {
    id?: SortOrder
    approval_code?: SortOrder
    user_id?: SortOrder
    admin_id?: SortOrder
    manager_slot?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Approved_ManagerAvgOrderByAggregateInput = {
    manager_slot?: SortOrder
  }

  export type Approved_ManagerMaxOrderByAggregateInput = {
    id?: SortOrder
    approval_code?: SortOrder
    user_id?: SortOrder
    admin_id?: SortOrder
    manager_slot?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Approved_ManagerMinOrderByAggregateInput = {
    id?: SortOrder
    approval_code?: SortOrder
    user_id?: SortOrder
    admin_id?: SortOrder
    manager_slot?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Approved_ManagerSumOrderByAggregateInput = {
    manager_slot?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type Approved_AdminCountOrderByAggregateInput = {
    id?: SortOrder
    approval_code?: SortOrder
    admin_id?: SortOrder
    superAdmin_id?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Approved_AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    approval_code?: SortOrder
    admin_id?: SortOrder
    superAdmin_id?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Approved_AdminMinOrderByAggregateInput = {
    id?: SortOrder
    approval_code?: SortOrder
    admin_id?: SortOrder
    superAdmin_id?: SortOrder
    is_used?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioCreateNestedManyWithoutUserInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type ManagerCreateNestedOneWithoutUserInput = {
    create?: XOR<ManagerCreateWithoutUserInput, ManagerUncheckedCreateWithoutUserInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutUserInput
    connect?: ManagerWhereUniqueInput
  }

  export type ManagerCreateNestedOneWithoutManaged_byInput = {
    create?: XOR<ManagerCreateWithoutManaged_byInput, ManagerUncheckedCreateWithoutManaged_byInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutManaged_byInput
    connect?: ManagerWhereUniqueInput
  }

  export type AdminCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type Approved_AdminCreateNestedOneWithoutAdminInput = {
    create?: XOR<Approved_AdminCreateWithoutAdminInput, Approved_AdminUncheckedCreateWithoutAdminInput>
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutAdminInput
    connect?: Approved_AdminWhereUniqueInput
  }

  export type Approved_ManagerCreateNestedOneWithoutManagerInput = {
    create?: XOR<Approved_ManagerCreateWithoutManagerInput, Approved_ManagerUncheckedCreateWithoutManagerInput>
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutManagerInput
    connect?: Approved_ManagerWhereUniqueInput
  }

  export type PortfolioUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type ManagerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ManagerCreateWithoutUserInput, ManagerUncheckedCreateWithoutUserInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutUserInput
    connect?: ManagerWhereUniqueInput
  }

  export type AdminUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type Approved_AdminUncheckedCreateNestedOneWithoutAdminInput = {
    create?: XOR<Approved_AdminCreateWithoutAdminInput, Approved_AdminUncheckedCreateWithoutAdminInput>
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutAdminInput
    connect?: Approved_AdminWhereUniqueInput
  }

  export type Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput = {
    create?: XOR<Approved_ManagerCreateWithoutManagerInput, Approved_ManagerUncheckedCreateWithoutManagerInput>
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutManagerInput
    connect?: Approved_ManagerWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRolesFieldUpdateOperationsInput = {
    set?: $Enums.Roles
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PortfolioUpdateManyWithoutUserNestedInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutUserInput | PortfolioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutUserInput | PortfolioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutUserInput | PortfolioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type ManagerUpdateOneWithoutUserNestedInput = {
    create?: XOR<ManagerCreateWithoutUserInput, ManagerUncheckedCreateWithoutUserInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutUserInput
    upsert?: ManagerUpsertWithoutUserInput
    disconnect?: ManagerWhereInput | boolean
    delete?: ManagerWhereInput | boolean
    connect?: ManagerWhereUniqueInput
    update?: XOR<XOR<ManagerUpdateToOneWithWhereWithoutUserInput, ManagerUpdateWithoutUserInput>, ManagerUncheckedUpdateWithoutUserInput>
  }

  export type ManagerUpdateOneWithoutManaged_byNestedInput = {
    create?: XOR<ManagerCreateWithoutManaged_byInput, ManagerUncheckedCreateWithoutManaged_byInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutManaged_byInput
    upsert?: ManagerUpsertWithoutManaged_byInput
    disconnect?: ManagerWhereInput | boolean
    delete?: ManagerWhereInput | boolean
    connect?: ManagerWhereUniqueInput
    update?: XOR<XOR<ManagerUpdateToOneWithWhereWithoutManaged_byInput, ManagerUpdateWithoutManaged_byInput>, ManagerUncheckedUpdateWithoutManaged_byInput>
  }

  export type AdminUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type Approved_AdminUpdateOneWithoutAdminNestedInput = {
    create?: XOR<Approved_AdminCreateWithoutAdminInput, Approved_AdminUncheckedCreateWithoutAdminInput>
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutAdminInput
    upsert?: Approved_AdminUpsertWithoutAdminInput
    disconnect?: Approved_AdminWhereInput | boolean
    delete?: Approved_AdminWhereInput | boolean
    connect?: Approved_AdminWhereUniqueInput
    update?: XOR<XOR<Approved_AdminUpdateToOneWithWhereWithoutAdminInput, Approved_AdminUpdateWithoutAdminInput>, Approved_AdminUncheckedUpdateWithoutAdminInput>
  }

  export type Approved_ManagerUpdateOneWithoutManagerNestedInput = {
    create?: XOR<Approved_ManagerCreateWithoutManagerInput, Approved_ManagerUncheckedCreateWithoutManagerInput>
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutManagerInput
    upsert?: Approved_ManagerUpsertWithoutManagerInput
    disconnect?: Approved_ManagerWhereInput | boolean
    delete?: Approved_ManagerWhereInput | boolean
    connect?: Approved_ManagerWhereUniqueInput
    update?: XOR<XOR<Approved_ManagerUpdateToOneWithWhereWithoutManagerInput, Approved_ManagerUpdateWithoutManagerInput>, Approved_ManagerUncheckedUpdateWithoutManagerInput>
  }

  export type PortfolioUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput> | PortfolioCreateWithoutUserInput[] | PortfolioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutUserInput | PortfolioCreateOrConnectWithoutUserInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutUserInput | PortfolioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PortfolioCreateManyUserInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutUserInput | PortfolioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutUserInput | PortfolioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type ManagerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ManagerCreateWithoutUserInput, ManagerUncheckedCreateWithoutUserInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutUserInput
    upsert?: ManagerUpsertWithoutUserInput
    disconnect?: ManagerWhereInput | boolean
    delete?: ManagerWhereInput | boolean
    connect?: ManagerWhereUniqueInput
    update?: XOR<XOR<ManagerUpdateToOneWithWhereWithoutUserInput, ManagerUpdateWithoutUserInput>, ManagerUncheckedUpdateWithoutUserInput>
  }

  export type AdminUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput = {
    create?: XOR<Approved_AdminCreateWithoutAdminInput, Approved_AdminUncheckedCreateWithoutAdminInput>
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutAdminInput
    upsert?: Approved_AdminUpsertWithoutAdminInput
    disconnect?: Approved_AdminWhereInput | boolean
    delete?: Approved_AdminWhereInput | boolean
    connect?: Approved_AdminWhereUniqueInput
    update?: XOR<XOR<Approved_AdminUpdateToOneWithWhereWithoutAdminInput, Approved_AdminUpdateWithoutAdminInput>, Approved_AdminUncheckedUpdateWithoutAdminInput>
  }

  export type Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput = {
    create?: XOR<Approved_ManagerCreateWithoutManagerInput, Approved_ManagerUncheckedCreateWithoutManagerInput>
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutManagerInput
    upsert?: Approved_ManagerUpsertWithoutManagerInput
    disconnect?: Approved_ManagerWhereInput | boolean
    delete?: Approved_ManagerWhereInput | boolean
    connect?: Approved_ManagerWhereUniqueInput
    update?: XOR<XOR<Approved_ManagerUpdateToOneWithWhereWithoutManagerInput, Approved_ManagerUpdateWithoutManagerInput>, Approved_ManagerUncheckedUpdateWithoutManagerInput>
  }

  export type InvestmentCreateNestedManyWithoutStockInput = {
    create?: XOR<InvestmentCreateWithoutStockInput, InvestmentUncheckedCreateWithoutStockInput> | InvestmentCreateWithoutStockInput[] | InvestmentUncheckedCreateWithoutStockInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutStockInput | InvestmentCreateOrConnectWithoutStockInput[]
    createMany?: InvestmentCreateManyStockInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutStockInput = {
    create?: XOR<TransactionCreateWithoutStockInput, TransactionUncheckedCreateWithoutStockInput> | TransactionCreateWithoutStockInput[] | TransactionUncheckedCreateWithoutStockInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStockInput | TransactionCreateOrConnectWithoutStockInput[]
    createMany?: TransactionCreateManyStockInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type Trade_requestCreateNestedManyWithoutStockInput = {
    create?: XOR<Trade_requestCreateWithoutStockInput, Trade_requestUncheckedCreateWithoutStockInput> | Trade_requestCreateWithoutStockInput[] | Trade_requestUncheckedCreateWithoutStockInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutStockInput | Trade_requestCreateOrConnectWithoutStockInput[]
    createMany?: Trade_requestCreateManyStockInputEnvelope
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
  }

  export type InvestmentUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<InvestmentCreateWithoutStockInput, InvestmentUncheckedCreateWithoutStockInput> | InvestmentCreateWithoutStockInput[] | InvestmentUncheckedCreateWithoutStockInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutStockInput | InvestmentCreateOrConnectWithoutStockInput[]
    createMany?: InvestmentCreateManyStockInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<TransactionCreateWithoutStockInput, TransactionUncheckedCreateWithoutStockInput> | TransactionCreateWithoutStockInput[] | TransactionUncheckedCreateWithoutStockInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStockInput | TransactionCreateOrConnectWithoutStockInput[]
    createMany?: TransactionCreateManyStockInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type Trade_requestUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<Trade_requestCreateWithoutStockInput, Trade_requestUncheckedCreateWithoutStockInput> | Trade_requestCreateWithoutStockInput[] | Trade_requestUncheckedCreateWithoutStockInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutStockInput | Trade_requestCreateOrConnectWithoutStockInput[]
    createMany?: Trade_requestCreateManyStockInputEnvelope
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type InvestmentUpdateManyWithoutStockNestedInput = {
    create?: XOR<InvestmentCreateWithoutStockInput, InvestmentUncheckedCreateWithoutStockInput> | InvestmentCreateWithoutStockInput[] | InvestmentUncheckedCreateWithoutStockInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutStockInput | InvestmentCreateOrConnectWithoutStockInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutStockInput | InvestmentUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: InvestmentCreateManyStockInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutStockInput | InvestmentUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutStockInput | InvestmentUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutStockNestedInput = {
    create?: XOR<TransactionCreateWithoutStockInput, TransactionUncheckedCreateWithoutStockInput> | TransactionCreateWithoutStockInput[] | TransactionUncheckedCreateWithoutStockInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStockInput | TransactionCreateOrConnectWithoutStockInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutStockInput | TransactionUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: TransactionCreateManyStockInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutStockInput | TransactionUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutStockInput | TransactionUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type Trade_requestUpdateManyWithoutStockNestedInput = {
    create?: XOR<Trade_requestCreateWithoutStockInput, Trade_requestUncheckedCreateWithoutStockInput> | Trade_requestCreateWithoutStockInput[] | Trade_requestUncheckedCreateWithoutStockInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutStockInput | Trade_requestCreateOrConnectWithoutStockInput[]
    upsert?: Trade_requestUpsertWithWhereUniqueWithoutStockInput | Trade_requestUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: Trade_requestCreateManyStockInputEnvelope
    set?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    disconnect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    delete?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    update?: Trade_requestUpdateWithWhereUniqueWithoutStockInput | Trade_requestUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: Trade_requestUpdateManyWithWhereWithoutStockInput | Trade_requestUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
  }

  export type InvestmentUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<InvestmentCreateWithoutStockInput, InvestmentUncheckedCreateWithoutStockInput> | InvestmentCreateWithoutStockInput[] | InvestmentUncheckedCreateWithoutStockInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutStockInput | InvestmentCreateOrConnectWithoutStockInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutStockInput | InvestmentUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: InvestmentCreateManyStockInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutStockInput | InvestmentUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutStockInput | InvestmentUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<TransactionCreateWithoutStockInput, TransactionUncheckedCreateWithoutStockInput> | TransactionCreateWithoutStockInput[] | TransactionUncheckedCreateWithoutStockInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutStockInput | TransactionCreateOrConnectWithoutStockInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutStockInput | TransactionUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: TransactionCreateManyStockInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutStockInput | TransactionUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutStockInput | TransactionUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type Trade_requestUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<Trade_requestCreateWithoutStockInput, Trade_requestUncheckedCreateWithoutStockInput> | Trade_requestCreateWithoutStockInput[] | Trade_requestUncheckedCreateWithoutStockInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutStockInput | Trade_requestCreateOrConnectWithoutStockInput[]
    upsert?: Trade_requestUpsertWithWhereUniqueWithoutStockInput | Trade_requestUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: Trade_requestCreateManyStockInputEnvelope
    set?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    disconnect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    delete?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    update?: Trade_requestUpdateWithWhereUniqueWithoutStockInput | Trade_requestUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: Trade_requestUpdateManyWithWhereWithoutStockInput | Trade_requestUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPortfolioInput = {
    create?: XOR<UserCreateWithoutPortfolioInput, UserUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfolioInput
    connect?: UserWhereUniqueInput
  }

  export type InvestmentCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<InvestmentCreateWithoutPortfolioInput, InvestmentUncheckedCreateWithoutPortfolioInput> | InvestmentCreateWithoutPortfolioInput[] | InvestmentUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutPortfolioInput | InvestmentCreateOrConnectWithoutPortfolioInput[]
    createMany?: InvestmentCreateManyPortfolioInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<TransactionCreateWithoutPortfolioInput, TransactionUncheckedCreateWithoutPortfolioInput> | TransactionCreateWithoutPortfolioInput[] | TransactionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPortfolioInput | TransactionCreateOrConnectWithoutPortfolioInput[]
    createMany?: TransactionCreateManyPortfolioInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type Trade_requestCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<Trade_requestCreateWithoutPortfolioInput, Trade_requestUncheckedCreateWithoutPortfolioInput> | Trade_requestCreateWithoutPortfolioInput[] | Trade_requestUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutPortfolioInput | Trade_requestCreateOrConnectWithoutPortfolioInput[]
    createMany?: Trade_requestCreateManyPortfolioInputEnvelope
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
  }

  export type InvestmentUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<InvestmentCreateWithoutPortfolioInput, InvestmentUncheckedCreateWithoutPortfolioInput> | InvestmentCreateWithoutPortfolioInput[] | InvestmentUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutPortfolioInput | InvestmentCreateOrConnectWithoutPortfolioInput[]
    createMany?: InvestmentCreateManyPortfolioInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<TransactionCreateWithoutPortfolioInput, TransactionUncheckedCreateWithoutPortfolioInput> | TransactionCreateWithoutPortfolioInput[] | TransactionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPortfolioInput | TransactionCreateOrConnectWithoutPortfolioInput[]
    createMany?: TransactionCreateManyPortfolioInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type Trade_requestUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<Trade_requestCreateWithoutPortfolioInput, Trade_requestUncheckedCreateWithoutPortfolioInput> | Trade_requestCreateWithoutPortfolioInput[] | Trade_requestUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutPortfolioInput | Trade_requestCreateOrConnectWithoutPortfolioInput[]
    createMany?: Trade_requestCreateManyPortfolioInputEnvelope
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPortfolioNestedInput = {
    create?: XOR<UserCreateWithoutPortfolioInput, UserUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfolioInput
    upsert?: UserUpsertWithoutPortfolioInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPortfolioInput, UserUpdateWithoutPortfolioInput>, UserUncheckedUpdateWithoutPortfolioInput>
  }

  export type InvestmentUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<InvestmentCreateWithoutPortfolioInput, InvestmentUncheckedCreateWithoutPortfolioInput> | InvestmentCreateWithoutPortfolioInput[] | InvestmentUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutPortfolioInput | InvestmentCreateOrConnectWithoutPortfolioInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutPortfolioInput | InvestmentUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: InvestmentCreateManyPortfolioInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutPortfolioInput | InvestmentUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutPortfolioInput | InvestmentUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<TransactionCreateWithoutPortfolioInput, TransactionUncheckedCreateWithoutPortfolioInput> | TransactionCreateWithoutPortfolioInput[] | TransactionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPortfolioInput | TransactionCreateOrConnectWithoutPortfolioInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPortfolioInput | TransactionUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: TransactionCreateManyPortfolioInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPortfolioInput | TransactionUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPortfolioInput | TransactionUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type Trade_requestUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<Trade_requestCreateWithoutPortfolioInput, Trade_requestUncheckedCreateWithoutPortfolioInput> | Trade_requestCreateWithoutPortfolioInput[] | Trade_requestUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutPortfolioInput | Trade_requestCreateOrConnectWithoutPortfolioInput[]
    upsert?: Trade_requestUpsertWithWhereUniqueWithoutPortfolioInput | Trade_requestUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: Trade_requestCreateManyPortfolioInputEnvelope
    set?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    disconnect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    delete?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    update?: Trade_requestUpdateWithWhereUniqueWithoutPortfolioInput | Trade_requestUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: Trade_requestUpdateManyWithWhereWithoutPortfolioInput | Trade_requestUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
  }

  export type InvestmentUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<InvestmentCreateWithoutPortfolioInput, InvestmentUncheckedCreateWithoutPortfolioInput> | InvestmentCreateWithoutPortfolioInput[] | InvestmentUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutPortfolioInput | InvestmentCreateOrConnectWithoutPortfolioInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutPortfolioInput | InvestmentUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: InvestmentCreateManyPortfolioInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutPortfolioInput | InvestmentUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutPortfolioInput | InvestmentUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<TransactionCreateWithoutPortfolioInput, TransactionUncheckedCreateWithoutPortfolioInput> | TransactionCreateWithoutPortfolioInput[] | TransactionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPortfolioInput | TransactionCreateOrConnectWithoutPortfolioInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPortfolioInput | TransactionUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: TransactionCreateManyPortfolioInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPortfolioInput | TransactionUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPortfolioInput | TransactionUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type Trade_requestUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<Trade_requestCreateWithoutPortfolioInput, Trade_requestUncheckedCreateWithoutPortfolioInput> | Trade_requestCreateWithoutPortfolioInput[] | Trade_requestUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutPortfolioInput | Trade_requestCreateOrConnectWithoutPortfolioInput[]
    upsert?: Trade_requestUpsertWithWhereUniqueWithoutPortfolioInput | Trade_requestUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: Trade_requestCreateManyPortfolioInputEnvelope
    set?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    disconnect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    delete?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    update?: Trade_requestUpdateWithWhereUniqueWithoutPortfolioInput | Trade_requestUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: Trade_requestUpdateManyWithWhereWithoutPortfolioInput | Trade_requestUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
  }

  export type PortfolioCreateNestedOneWithoutInvestmentInput = {
    create?: XOR<PortfolioCreateWithoutInvestmentInput, PortfolioUncheckedCreateWithoutInvestmentInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutInvestmentInput
    connect?: PortfolioWhereUniqueInput
  }

  export type StockTableCreateNestedOneWithoutInvestmentInput = {
    create?: XOR<StockTableCreateWithoutInvestmentInput, StockTableUncheckedCreateWithoutInvestmentInput>
    connectOrCreate?: StockTableCreateOrConnectWithoutInvestmentInput
    connect?: StockTableWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PortfolioUpdateOneRequiredWithoutInvestmentNestedInput = {
    create?: XOR<PortfolioCreateWithoutInvestmentInput, PortfolioUncheckedCreateWithoutInvestmentInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutInvestmentInput
    upsert?: PortfolioUpsertWithoutInvestmentInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutInvestmentInput, PortfolioUpdateWithoutInvestmentInput>, PortfolioUncheckedUpdateWithoutInvestmentInput>
  }

  export type StockTableUpdateOneRequiredWithoutInvestmentNestedInput = {
    create?: XOR<StockTableCreateWithoutInvestmentInput, StockTableUncheckedCreateWithoutInvestmentInput>
    connectOrCreate?: StockTableCreateOrConnectWithoutInvestmentInput
    upsert?: StockTableUpsertWithoutInvestmentInput
    connect?: StockTableWhereUniqueInput
    update?: XOR<XOR<StockTableUpdateToOneWithWhereWithoutInvestmentInput, StockTableUpdateWithoutInvestmentInput>, StockTableUncheckedUpdateWithoutInvestmentInput>
  }

  export type PortfolioCreateNestedOneWithoutTransactionInput = {
    create?: XOR<PortfolioCreateWithoutTransactionInput, PortfolioUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutTransactionInput
    connect?: PortfolioWhereUniqueInput
  }

  export type StockTableCreateNestedOneWithoutTransactionInput = {
    create?: XOR<StockTableCreateWithoutTransactionInput, StockTableUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: StockTableCreateOrConnectWithoutTransactionInput
    connect?: StockTableWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type PortfolioUpdateOneRequiredWithoutTransactionNestedInput = {
    create?: XOR<PortfolioCreateWithoutTransactionInput, PortfolioUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutTransactionInput
    upsert?: PortfolioUpsertWithoutTransactionInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutTransactionInput, PortfolioUpdateWithoutTransactionInput>, PortfolioUncheckedUpdateWithoutTransactionInput>
  }

  export type StockTableUpdateOneRequiredWithoutTransactionNestedInput = {
    create?: XOR<StockTableCreateWithoutTransactionInput, StockTableUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: StockTableCreateOrConnectWithoutTransactionInput
    upsert?: StockTableUpsertWithoutTransactionInput
    connect?: StockTableWhereUniqueInput
    update?: XOR<XOR<StockTableUpdateToOneWithWhereWithoutTransactionInput, StockTableUpdateWithoutTransactionInput>, StockTableUncheckedUpdateWithoutTransactionInput>
  }

  export type PortfolioCreateNestedOneWithoutTrade_requestInput = {
    create?: XOR<PortfolioCreateWithoutTrade_requestInput, PortfolioUncheckedCreateWithoutTrade_requestInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutTrade_requestInput
    connect?: PortfolioWhereUniqueInput
  }

  export type StockTableCreateNestedOneWithoutTrade_requestInput = {
    create?: XOR<StockTableCreateWithoutTrade_requestInput, StockTableUncheckedCreateWithoutTrade_requestInput>
    connectOrCreate?: StockTableCreateOrConnectWithoutTrade_requestInput
    connect?: StockTableWhereUniqueInput
  }

  export type ManagerCreateNestedOneWithoutApprovedByInput = {
    create?: XOR<ManagerCreateWithoutApprovedByInput, ManagerUncheckedCreateWithoutApprovedByInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutApprovedByInput
    connect?: ManagerWhereUniqueInput
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type PortfolioUpdateOneRequiredWithoutTrade_requestNestedInput = {
    create?: XOR<PortfolioCreateWithoutTrade_requestInput, PortfolioUncheckedCreateWithoutTrade_requestInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutTrade_requestInput
    upsert?: PortfolioUpsertWithoutTrade_requestInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutTrade_requestInput, PortfolioUpdateWithoutTrade_requestInput>, PortfolioUncheckedUpdateWithoutTrade_requestInput>
  }

  export type StockTableUpdateOneRequiredWithoutTrade_requestNestedInput = {
    create?: XOR<StockTableCreateWithoutTrade_requestInput, StockTableUncheckedCreateWithoutTrade_requestInput>
    connectOrCreate?: StockTableCreateOrConnectWithoutTrade_requestInput
    upsert?: StockTableUpsertWithoutTrade_requestInput
    connect?: StockTableWhereUniqueInput
    update?: XOR<XOR<StockTableUpdateToOneWithWhereWithoutTrade_requestInput, StockTableUpdateWithoutTrade_requestInput>, StockTableUncheckedUpdateWithoutTrade_requestInput>
  }

  export type ManagerUpdateOneWithoutApprovedByNestedInput = {
    create?: XOR<ManagerCreateWithoutApprovedByInput, ManagerUncheckedCreateWithoutApprovedByInput>
    connectOrCreate?: ManagerCreateOrConnectWithoutApprovedByInput
    upsert?: ManagerUpsertWithoutApprovedByInput
    disconnect?: ManagerWhereInput | boolean
    delete?: ManagerWhereInput | boolean
    connect?: ManagerWhereUniqueInput
    update?: XOR<XOR<ManagerUpdateToOneWithWhereWithoutApprovedByInput, ManagerUpdateWithoutApprovedByInput>, ManagerUncheckedUpdateWithoutApprovedByInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokenInput = {
    create?: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokenNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput
    upsert?: UserUpsertWithoutRefreshTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokenInput, UserUpdateWithoutRefreshTokenInput>, UserUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type UserCreateNestedOneWithoutManagerInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutClient_managerInput = {
    create?: XOR<UserCreateWithoutClient_managerInput, UserUncheckedCreateWithoutClient_managerInput> | UserCreateWithoutClient_managerInput[] | UserUncheckedCreateWithoutClient_managerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutClient_managerInput | UserCreateOrConnectWithoutClient_managerInput[]
    createMany?: UserCreateManyClient_managerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type Trade_requestCreateNestedManyWithoutApprovedInput = {
    create?: XOR<Trade_requestCreateWithoutApprovedInput, Trade_requestUncheckedCreateWithoutApprovedInput> | Trade_requestCreateWithoutApprovedInput[] | Trade_requestUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutApprovedInput | Trade_requestCreateOrConnectWithoutApprovedInput[]
    createMany?: Trade_requestCreateManyApprovedInputEnvelope
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutClient_managerInput = {
    create?: XOR<UserCreateWithoutClient_managerInput, UserUncheckedCreateWithoutClient_managerInput> | UserCreateWithoutClient_managerInput[] | UserUncheckedCreateWithoutClient_managerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutClient_managerInput | UserCreateOrConnectWithoutClient_managerInput[]
    createMany?: UserCreateManyClient_managerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type Trade_requestUncheckedCreateNestedManyWithoutApprovedInput = {
    create?: XOR<Trade_requestCreateWithoutApprovedInput, Trade_requestUncheckedCreateWithoutApprovedInput> | Trade_requestCreateWithoutApprovedInput[] | Trade_requestUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutApprovedInput | Trade_requestCreateOrConnectWithoutApprovedInput[]
    createMany?: Trade_requestCreateManyApprovedInputEnvelope
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutManagerNestedInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput
    upsert?: UserUpsertWithoutManagerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutManagerInput, UserUpdateWithoutManagerInput>, UserUncheckedUpdateWithoutManagerInput>
  }

  export type UserUpdateManyWithoutClient_managerNestedInput = {
    create?: XOR<UserCreateWithoutClient_managerInput, UserUncheckedCreateWithoutClient_managerInput> | UserCreateWithoutClient_managerInput[] | UserUncheckedCreateWithoutClient_managerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutClient_managerInput | UserCreateOrConnectWithoutClient_managerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutClient_managerInput | UserUpsertWithWhereUniqueWithoutClient_managerInput[]
    createMany?: UserCreateManyClient_managerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutClient_managerInput | UserUpdateWithWhereUniqueWithoutClient_managerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutClient_managerInput | UserUpdateManyWithWhereWithoutClient_managerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type Trade_requestUpdateManyWithoutApprovedNestedInput = {
    create?: XOR<Trade_requestCreateWithoutApprovedInput, Trade_requestUncheckedCreateWithoutApprovedInput> | Trade_requestCreateWithoutApprovedInput[] | Trade_requestUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutApprovedInput | Trade_requestCreateOrConnectWithoutApprovedInput[]
    upsert?: Trade_requestUpsertWithWhereUniqueWithoutApprovedInput | Trade_requestUpsertWithWhereUniqueWithoutApprovedInput[]
    createMany?: Trade_requestCreateManyApprovedInputEnvelope
    set?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    disconnect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    delete?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    update?: Trade_requestUpdateWithWhereUniqueWithoutApprovedInput | Trade_requestUpdateWithWhereUniqueWithoutApprovedInput[]
    updateMany?: Trade_requestUpdateManyWithWhereWithoutApprovedInput | Trade_requestUpdateManyWithWhereWithoutApprovedInput[]
    deleteMany?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutClient_managerNestedInput = {
    create?: XOR<UserCreateWithoutClient_managerInput, UserUncheckedCreateWithoutClient_managerInput> | UserCreateWithoutClient_managerInput[] | UserUncheckedCreateWithoutClient_managerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutClient_managerInput | UserCreateOrConnectWithoutClient_managerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutClient_managerInput | UserUpsertWithWhereUniqueWithoutClient_managerInput[]
    createMany?: UserCreateManyClient_managerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutClient_managerInput | UserUpdateWithWhereUniqueWithoutClient_managerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutClient_managerInput | UserUpdateManyWithWhereWithoutClient_managerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type Trade_requestUncheckedUpdateManyWithoutApprovedNestedInput = {
    create?: XOR<Trade_requestCreateWithoutApprovedInput, Trade_requestUncheckedCreateWithoutApprovedInput> | Trade_requestCreateWithoutApprovedInput[] | Trade_requestUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: Trade_requestCreateOrConnectWithoutApprovedInput | Trade_requestCreateOrConnectWithoutApprovedInput[]
    upsert?: Trade_requestUpsertWithWhereUniqueWithoutApprovedInput | Trade_requestUpsertWithWhereUniqueWithoutApprovedInput[]
    createMany?: Trade_requestCreateManyApprovedInputEnvelope
    set?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    disconnect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    delete?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    connect?: Trade_requestWhereUniqueInput | Trade_requestWhereUniqueInput[]
    update?: Trade_requestUpdateWithWhereUniqueWithoutApprovedInput | Trade_requestUpdateWithWhereUniqueWithoutApprovedInput[]
    updateMany?: Trade_requestUpdateManyWithWhereWithoutApprovedInput | Trade_requestUpdateManyWithWhereWithoutApprovedInput[]
    deleteMany?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTo_adminInput = {
    create?: XOR<UserCreateWithoutTo_adminInput, UserUncheckedCreateWithoutTo_adminInput>
    connectOrCreate?: UserCreateOrConnectWithoutTo_adminInput
    connect?: UserWhereUniqueInput
  }

  export type Approved_ManagerCreateNestedManyWithoutAdminInput = {
    create?: XOR<Approved_ManagerCreateWithoutAdminInput, Approved_ManagerUncheckedCreateWithoutAdminInput> | Approved_ManagerCreateWithoutAdminInput[] | Approved_ManagerUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutAdminInput | Approved_ManagerCreateOrConnectWithoutAdminInput[]
    createMany?: Approved_ManagerCreateManyAdminInputEnvelope
    connect?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
  }

  export type Approved_AdminCreateNestedManyWithoutSuperAdminInput = {
    create?: XOR<Approved_AdminCreateWithoutSuperAdminInput, Approved_AdminUncheckedCreateWithoutSuperAdminInput> | Approved_AdminCreateWithoutSuperAdminInput[] | Approved_AdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutSuperAdminInput | Approved_AdminCreateOrConnectWithoutSuperAdminInput[]
    createMany?: Approved_AdminCreateManySuperAdminInputEnvelope
    connect?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
  }

  export type Approved_ManagerUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<Approved_ManagerCreateWithoutAdminInput, Approved_ManagerUncheckedCreateWithoutAdminInput> | Approved_ManagerCreateWithoutAdminInput[] | Approved_ManagerUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutAdminInput | Approved_ManagerCreateOrConnectWithoutAdminInput[]
    createMany?: Approved_ManagerCreateManyAdminInputEnvelope
    connect?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
  }

  export type Approved_AdminUncheckedCreateNestedManyWithoutSuperAdminInput = {
    create?: XOR<Approved_AdminCreateWithoutSuperAdminInput, Approved_AdminUncheckedCreateWithoutSuperAdminInput> | Approved_AdminCreateWithoutSuperAdminInput[] | Approved_AdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutSuperAdminInput | Approved_AdminCreateOrConnectWithoutSuperAdminInput[]
    createMany?: Approved_AdminCreateManySuperAdminInputEnvelope
    connect?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTo_adminNestedInput = {
    create?: XOR<UserCreateWithoutTo_adminInput, UserUncheckedCreateWithoutTo_adminInput>
    connectOrCreate?: UserCreateOrConnectWithoutTo_adminInput
    upsert?: UserUpsertWithoutTo_adminInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTo_adminInput, UserUpdateWithoutTo_adminInput>, UserUncheckedUpdateWithoutTo_adminInput>
  }

  export type Approved_ManagerUpdateManyWithoutAdminNestedInput = {
    create?: XOR<Approved_ManagerCreateWithoutAdminInput, Approved_ManagerUncheckedCreateWithoutAdminInput> | Approved_ManagerCreateWithoutAdminInput[] | Approved_ManagerUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutAdminInput | Approved_ManagerCreateOrConnectWithoutAdminInput[]
    upsert?: Approved_ManagerUpsertWithWhereUniqueWithoutAdminInput | Approved_ManagerUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: Approved_ManagerCreateManyAdminInputEnvelope
    set?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    disconnect?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    delete?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    connect?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    update?: Approved_ManagerUpdateWithWhereUniqueWithoutAdminInput | Approved_ManagerUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: Approved_ManagerUpdateManyWithWhereWithoutAdminInput | Approved_ManagerUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: Approved_ManagerScalarWhereInput | Approved_ManagerScalarWhereInput[]
  }

  export type Approved_AdminUpdateManyWithoutSuperAdminNestedInput = {
    create?: XOR<Approved_AdminCreateWithoutSuperAdminInput, Approved_AdminUncheckedCreateWithoutSuperAdminInput> | Approved_AdminCreateWithoutSuperAdminInput[] | Approved_AdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutSuperAdminInput | Approved_AdminCreateOrConnectWithoutSuperAdminInput[]
    upsert?: Approved_AdminUpsertWithWhereUniqueWithoutSuperAdminInput | Approved_AdminUpsertWithWhereUniqueWithoutSuperAdminInput[]
    createMany?: Approved_AdminCreateManySuperAdminInputEnvelope
    set?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    disconnect?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    delete?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    connect?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    update?: Approved_AdminUpdateWithWhereUniqueWithoutSuperAdminInput | Approved_AdminUpdateWithWhereUniqueWithoutSuperAdminInput[]
    updateMany?: Approved_AdminUpdateManyWithWhereWithoutSuperAdminInput | Approved_AdminUpdateManyWithWhereWithoutSuperAdminInput[]
    deleteMany?: Approved_AdminScalarWhereInput | Approved_AdminScalarWhereInput[]
  }

  export type Approved_ManagerUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<Approved_ManagerCreateWithoutAdminInput, Approved_ManagerUncheckedCreateWithoutAdminInput> | Approved_ManagerCreateWithoutAdminInput[] | Approved_ManagerUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: Approved_ManagerCreateOrConnectWithoutAdminInput | Approved_ManagerCreateOrConnectWithoutAdminInput[]
    upsert?: Approved_ManagerUpsertWithWhereUniqueWithoutAdminInput | Approved_ManagerUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: Approved_ManagerCreateManyAdminInputEnvelope
    set?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    disconnect?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    delete?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    connect?: Approved_ManagerWhereUniqueInput | Approved_ManagerWhereUniqueInput[]
    update?: Approved_ManagerUpdateWithWhereUniqueWithoutAdminInput | Approved_ManagerUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: Approved_ManagerUpdateManyWithWhereWithoutAdminInput | Approved_ManagerUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: Approved_ManagerScalarWhereInput | Approved_ManagerScalarWhereInput[]
  }

  export type Approved_AdminUncheckedUpdateManyWithoutSuperAdminNestedInput = {
    create?: XOR<Approved_AdminCreateWithoutSuperAdminInput, Approved_AdminUncheckedCreateWithoutSuperAdminInput> | Approved_AdminCreateWithoutSuperAdminInput[] | Approved_AdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: Approved_AdminCreateOrConnectWithoutSuperAdminInput | Approved_AdminCreateOrConnectWithoutSuperAdminInput[]
    upsert?: Approved_AdminUpsertWithWhereUniqueWithoutSuperAdminInput | Approved_AdminUpsertWithWhereUniqueWithoutSuperAdminInput[]
    createMany?: Approved_AdminCreateManySuperAdminInputEnvelope
    set?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    disconnect?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    delete?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    connect?: Approved_AdminWhereUniqueInput | Approved_AdminWhereUniqueInput[]
    update?: Approved_AdminUpdateWithWhereUniqueWithoutSuperAdminInput | Approved_AdminUpdateWithWhereUniqueWithoutSuperAdminInput[]
    updateMany?: Approved_AdminUpdateManyWithWhereWithoutSuperAdminInput | Approved_AdminUpdateManyWithWhereWithoutSuperAdminInput[]
    deleteMany?: Approved_AdminScalarWhereInput | Approved_AdminScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutApproved_ManagerInput = {
    create?: XOR<UserCreateWithoutApproved_ManagerInput, UserUncheckedCreateWithoutApproved_ManagerInput>
    connectOrCreate?: UserCreateOrConnectWithoutApproved_ManagerInput
    connect?: UserWhereUniqueInput
  }

  export type AdminCreateNestedOneWithoutAdmin_idInput = {
    create?: XOR<AdminCreateWithoutAdmin_idInput, AdminUncheckedCreateWithoutAdmin_idInput>
    connectOrCreate?: AdminCreateOrConnectWithoutAdmin_idInput
    connect?: AdminWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutApproved_ManagerNestedInput = {
    create?: XOR<UserCreateWithoutApproved_ManagerInput, UserUncheckedCreateWithoutApproved_ManagerInput>
    connectOrCreate?: UserCreateOrConnectWithoutApproved_ManagerInput
    upsert?: UserUpsertWithoutApproved_ManagerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApproved_ManagerInput, UserUpdateWithoutApproved_ManagerInput>, UserUncheckedUpdateWithoutApproved_ManagerInput>
  }

  export type AdminUpdateOneRequiredWithoutAdmin_idNestedInput = {
    create?: XOR<AdminCreateWithoutAdmin_idInput, AdminUncheckedCreateWithoutAdmin_idInput>
    connectOrCreate?: AdminCreateOrConnectWithoutAdmin_idInput
    upsert?: AdminUpsertWithoutAdmin_idInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutAdmin_idInput, AdminUpdateWithoutAdmin_idInput>, AdminUncheckedUpdateWithoutAdmin_idInput>
  }

  export type UserCreateNestedOneWithoutAdd_adminInput = {
    create?: XOR<UserCreateWithoutAdd_adminInput, UserUncheckedCreateWithoutAdd_adminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdd_adminInput
    connect?: UserWhereUniqueInput
  }

  export type AdminCreateNestedOneWithoutSuper_admin_idInput = {
    create?: XOR<AdminCreateWithoutSuper_admin_idInput, AdminUncheckedCreateWithoutSuper_admin_idInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSuper_admin_idInput
    connect?: AdminWhereUniqueInput
  }

  export type UserUpdateOneWithoutAdd_adminNestedInput = {
    create?: XOR<UserCreateWithoutAdd_adminInput, UserUncheckedCreateWithoutAdd_adminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdd_adminInput
    upsert?: UserUpsertWithoutAdd_adminInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdd_adminInput, UserUpdateWithoutAdd_adminInput>, UserUncheckedUpdateWithoutAdd_adminInput>
  }

  export type AdminUpdateOneRequiredWithoutSuper_admin_idNestedInput = {
    create?: XOR<AdminCreateWithoutSuper_admin_idInput, AdminUncheckedCreateWithoutSuper_admin_idInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSuper_admin_idInput
    upsert?: AdminUpsertWithoutSuper_admin_idInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutSuper_admin_idInput, AdminUpdateWithoutSuper_admin_idInput>, AdminUncheckedUpdateWithoutSuper_admin_idInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRolesFilter<$PrismaModel = never> = {
    equals?: $Enums.Roles | EnumRolesFieldRefInput<$PrismaModel>
    in?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumRolesFilter<$PrismaModel> | $Enums.Roles
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRolesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Roles | EnumRolesFieldRefInput<$PrismaModel>
    in?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Roles[] | ListEnumRolesFieldRefInput<$PrismaModel>
    not?: NestedEnumRolesWithAggregatesFilter<$PrismaModel> | $Enums.Roles
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolesFilter<$PrismaModel>
    _max?: NestedEnumRolesFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type PortfolioCreateWithoutUserInput = {
    id?: string
    investment?: InvestmentCreateNestedManyWithoutPortfolioInput
    transaction?: TransactionCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutUserInput = {
    id?: string
    investment?: InvestmentUncheckedCreateNestedManyWithoutPortfolioInput
    transaction?: TransactionUncheckedCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput>
  }

  export type PortfolioCreateManyUserInputEnvelope = {
    data: PortfolioCreateManyUserInput | PortfolioCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ManagerCreateWithoutUserInput = {
    id?: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    managed_by?: UserCreateNestedManyWithoutClient_managerInput
    approvedBy?: Trade_requestCreateNestedManyWithoutApprovedInput
  }

  export type ManagerUncheckedCreateWithoutUserInput = {
    id?: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    managed_by?: UserUncheckedCreateNestedManyWithoutClient_managerInput
    approvedBy?: Trade_requestUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type ManagerCreateOrConnectWithoutUserInput = {
    where: ManagerWhereUniqueInput
    create: XOR<ManagerCreateWithoutUserInput, ManagerUncheckedCreateWithoutUserInput>
  }

  export type ManagerCreateWithoutManaged_byInput = {
    id?: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutManagerInput
    approvedBy?: Trade_requestCreateNestedManyWithoutApprovedInput
  }

  export type ManagerUncheckedCreateWithoutManaged_byInput = {
    id?: string
    manager_id: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedBy?: Trade_requestUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type ManagerCreateOrConnectWithoutManaged_byInput = {
    where: ManagerWhereUniqueInput
    create: XOR<ManagerCreateWithoutManaged_byInput, ManagerUncheckedCreateWithoutManaged_byInput>
  }

  export type AdminCreateWithoutUserInput = {
    id?: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin_id?: Approved_ManagerCreateNestedManyWithoutAdminInput
    super_admin_id?: Approved_AdminCreateNestedManyWithoutSuperAdminInput
  }

  export type AdminUncheckedCreateWithoutUserInput = {
    id?: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin_id?: Approved_ManagerUncheckedCreateNestedManyWithoutAdminInput
    super_admin_id?: Approved_AdminUncheckedCreateNestedManyWithoutSuperAdminInput
  }

  export type AdminCreateOrConnectWithoutUserInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type Approved_AdminCreateWithoutAdminInput = {
    id?: string
    approval_code: string
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    superAdmin: AdminCreateNestedOneWithoutSuper_admin_idInput
  }

  export type Approved_AdminUncheckedCreateWithoutAdminInput = {
    id?: string
    approval_code: string
    superAdmin_id: string
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_AdminCreateOrConnectWithoutAdminInput = {
    where: Approved_AdminWhereUniqueInput
    create: XOR<Approved_AdminCreateWithoutAdminInput, Approved_AdminUncheckedCreateWithoutAdminInput>
  }

  export type Approved_ManagerCreateWithoutManagerInput = {
    id?: string
    approval_code: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: AdminCreateNestedOneWithoutAdmin_idInput
  }

  export type Approved_ManagerUncheckedCreateWithoutManagerInput = {
    id?: string
    approval_code: string
    admin_id: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_ManagerCreateOrConnectWithoutManagerInput = {
    where: Approved_ManagerWhereUniqueInput
    create: XOR<Approved_ManagerCreateWithoutManagerInput, Approved_ManagerUncheckedCreateWithoutManagerInput>
  }

  export type PortfolioUpsertWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutUserInput, PortfolioUncheckedUpdateWithoutUserInput>
    create: XOR<PortfolioCreateWithoutUserInput, PortfolioUncheckedCreateWithoutUserInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutUserInput, PortfolioUncheckedUpdateWithoutUserInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutUserInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutUserInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    user_id?: StringFilter<"Portfolio"> | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    user_id?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type ManagerUpsertWithoutUserInput = {
    update: XOR<ManagerUpdateWithoutUserInput, ManagerUncheckedUpdateWithoutUserInput>
    create: XOR<ManagerCreateWithoutUserInput, ManagerUncheckedCreateWithoutUserInput>
    where?: ManagerWhereInput
  }

  export type ManagerUpdateToOneWithWhereWithoutUserInput = {
    where?: ManagerWhereInput
    data: XOR<ManagerUpdateWithoutUserInput, ManagerUncheckedUpdateWithoutUserInput>
  }

  export type ManagerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managed_by?: UserUpdateManyWithoutClient_managerNestedInput
    approvedBy?: Trade_requestUpdateManyWithoutApprovedNestedInput
  }

  export type ManagerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managed_by?: UserUncheckedUpdateManyWithoutClient_managerNestedInput
    approvedBy?: Trade_requestUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type ManagerUpsertWithoutManaged_byInput = {
    update: XOR<ManagerUpdateWithoutManaged_byInput, ManagerUncheckedUpdateWithoutManaged_byInput>
    create: XOR<ManagerCreateWithoutManaged_byInput, ManagerUncheckedCreateWithoutManaged_byInput>
    where?: ManagerWhereInput
  }

  export type ManagerUpdateToOneWithWhereWithoutManaged_byInput = {
    where?: ManagerWhereInput
    data: XOR<ManagerUpdateWithoutManaged_byInput, ManagerUncheckedUpdateWithoutManaged_byInput>
  }

  export type ManagerUpdateWithoutManaged_byInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutManagerNestedInput
    approvedBy?: Trade_requestUpdateManyWithoutApprovedNestedInput
  }

  export type ManagerUncheckedUpdateWithoutManaged_byInput = {
    id?: StringFieldUpdateOperationsInput | string
    manager_id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: Trade_requestUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type AdminUpsertWithoutUserInput = {
    update: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: Approved_ManagerUpdateManyWithoutAdminNestedInput
    super_admin_id?: Approved_AdminUpdateManyWithoutSuperAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: Approved_ManagerUncheckedUpdateManyWithoutAdminNestedInput
    super_admin_id?: Approved_AdminUncheckedUpdateManyWithoutSuperAdminNestedInput
  }

  export type Approved_AdminUpsertWithoutAdminInput = {
    update: XOR<Approved_AdminUpdateWithoutAdminInput, Approved_AdminUncheckedUpdateWithoutAdminInput>
    create: XOR<Approved_AdminCreateWithoutAdminInput, Approved_AdminUncheckedCreateWithoutAdminInput>
    where?: Approved_AdminWhereInput
  }

  export type Approved_AdminUpdateToOneWithWhereWithoutAdminInput = {
    where?: Approved_AdminWhereInput
    data: XOR<Approved_AdminUpdateWithoutAdminInput, Approved_AdminUncheckedUpdateWithoutAdminInput>
  }

  export type Approved_AdminUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    superAdmin?: AdminUpdateOneRequiredWithoutSuper_admin_idNestedInput
  }

  export type Approved_AdminUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    superAdmin_id?: StringFieldUpdateOperationsInput | string
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_ManagerUpsertWithoutManagerInput = {
    update: XOR<Approved_ManagerUpdateWithoutManagerInput, Approved_ManagerUncheckedUpdateWithoutManagerInput>
    create: XOR<Approved_ManagerCreateWithoutManagerInput, Approved_ManagerUncheckedCreateWithoutManagerInput>
    where?: Approved_ManagerWhereInput
  }

  export type Approved_ManagerUpdateToOneWithWhereWithoutManagerInput = {
    where?: Approved_ManagerWhereInput
    data: XOR<Approved_ManagerUpdateWithoutManagerInput, Approved_ManagerUncheckedUpdateWithoutManagerInput>
  }

  export type Approved_ManagerUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutAdmin_idNestedInput
  }

  export type Approved_ManagerUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentCreateWithoutStockInput = {
    id?: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutInvestmentInput
  }

  export type InvestmentUncheckedCreateWithoutStockInput = {
    id?: string
    portfolio_id: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentCreateOrConnectWithoutStockInput = {
    where: InvestmentWhereUniqueInput
    create: XOR<InvestmentCreateWithoutStockInput, InvestmentUncheckedCreateWithoutStockInput>
  }

  export type InvestmentCreateManyStockInputEnvelope = {
    data: InvestmentCreateManyStockInput | InvestmentCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutStockInput = {
    id?: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutStockInput = {
    id?: string
    portfolio_id: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutStockInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutStockInput, TransactionUncheckedCreateWithoutStockInput>
  }

  export type TransactionCreateManyStockInputEnvelope = {
    data: TransactionCreateManyStockInput | TransactionCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type Trade_requestCreateWithoutStockInput = {
    id?: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    response?: string | null
    createdAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutTrade_requestInput
    approved?: ManagerCreateNestedOneWithoutApprovedByInput
  }

  export type Trade_requestUncheckedCreateWithoutStockInput = {
    id?: string
    portfolio_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    approved_by?: string | null
    response?: string | null
    createdAt?: Date | string
  }

  export type Trade_requestCreateOrConnectWithoutStockInput = {
    where: Trade_requestWhereUniqueInput
    create: XOR<Trade_requestCreateWithoutStockInput, Trade_requestUncheckedCreateWithoutStockInput>
  }

  export type Trade_requestCreateManyStockInputEnvelope = {
    data: Trade_requestCreateManyStockInput | Trade_requestCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type InvestmentUpsertWithWhereUniqueWithoutStockInput = {
    where: InvestmentWhereUniqueInput
    update: XOR<InvestmentUpdateWithoutStockInput, InvestmentUncheckedUpdateWithoutStockInput>
    create: XOR<InvestmentCreateWithoutStockInput, InvestmentUncheckedCreateWithoutStockInput>
  }

  export type InvestmentUpdateWithWhereUniqueWithoutStockInput = {
    where: InvestmentWhereUniqueInput
    data: XOR<InvestmentUpdateWithoutStockInput, InvestmentUncheckedUpdateWithoutStockInput>
  }

  export type InvestmentUpdateManyWithWhereWithoutStockInput = {
    where: InvestmentScalarWhereInput
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyWithoutStockInput>
  }

  export type InvestmentScalarWhereInput = {
    AND?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
    OR?: InvestmentScalarWhereInput[]
    NOT?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
    id?: StringFilter<"Investment"> | string
    portfolio_id?: StringFilter<"Investment"> | string
    stock_id?: StringFilter<"Investment"> | string
    quantity?: IntFilter<"Investment"> | number
    avgPrice?: DecimalFilter<"Investment"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    updatedAt?: DateTimeFilter<"Investment"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutStockInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutStockInput, TransactionUncheckedUpdateWithoutStockInput>
    create: XOR<TransactionCreateWithoutStockInput, TransactionUncheckedCreateWithoutStockInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutStockInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutStockInput, TransactionUncheckedUpdateWithoutStockInput>
  }

  export type TransactionUpdateManyWithWhereWithoutStockInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutStockInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    portfolio_id?: StringFilter<"Transaction"> | string
    stock_id?: StringFilter<"Transaction"> | string
    quantity?: IntFilter<"Transaction"> | number
    price?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type Trade_requestUpsertWithWhereUniqueWithoutStockInput = {
    where: Trade_requestWhereUniqueInput
    update: XOR<Trade_requestUpdateWithoutStockInput, Trade_requestUncheckedUpdateWithoutStockInput>
    create: XOR<Trade_requestCreateWithoutStockInput, Trade_requestUncheckedCreateWithoutStockInput>
  }

  export type Trade_requestUpdateWithWhereUniqueWithoutStockInput = {
    where: Trade_requestWhereUniqueInput
    data: XOR<Trade_requestUpdateWithoutStockInput, Trade_requestUncheckedUpdateWithoutStockInput>
  }

  export type Trade_requestUpdateManyWithWhereWithoutStockInput = {
    where: Trade_requestScalarWhereInput
    data: XOR<Trade_requestUpdateManyMutationInput, Trade_requestUncheckedUpdateManyWithoutStockInput>
  }

  export type Trade_requestScalarWhereInput = {
    AND?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
    OR?: Trade_requestScalarWhereInput[]
    NOT?: Trade_requestScalarWhereInput | Trade_requestScalarWhereInput[]
    id?: StringFilter<"Trade_request"> | string
    portfolio_id?: StringFilter<"Trade_request"> | string
    stock_id?: StringFilter<"Trade_request"> | string
    quantity?: IntFilter<"Trade_request"> | number
    status?: EnumStatusFilter<"Trade_request"> | $Enums.Status
    type?: EnumTransactionTypeFilter<"Trade_request"> | $Enums.TransactionType
    approved_by?: StringNullableFilter<"Trade_request"> | string | null
    response?: StringNullableFilter<"Trade_request"> | string | null
    createdAt?: DateTimeFilter<"Trade_request"> | Date | string
  }

  export type UserCreateWithoutPortfolioInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    manager?: ManagerCreateNestedOneWithoutUserInput
    client_manager?: ManagerCreateNestedOneWithoutManaged_byInput
    to_admin?: AdminCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerCreateNestedOneWithoutManagerInput
  }

  export type UserUncheckedCreateWithoutPortfolioInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    manager?: ManagerUncheckedCreateNestedOneWithoutUserInput
    to_admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminUncheckedCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput
  }

  export type UserCreateOrConnectWithoutPortfolioInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPortfolioInput, UserUncheckedCreateWithoutPortfolioInput>
  }

  export type InvestmentCreateWithoutPortfolioInput = {
    id?: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stock: StockTableCreateNestedOneWithoutInvestmentInput
  }

  export type InvestmentUncheckedCreateWithoutPortfolioInput = {
    id?: string
    stock_id: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvestmentCreateOrConnectWithoutPortfolioInput = {
    where: InvestmentWhereUniqueInput
    create: XOR<InvestmentCreateWithoutPortfolioInput, InvestmentUncheckedCreateWithoutPortfolioInput>
  }

  export type InvestmentCreateManyPortfolioInputEnvelope = {
    data: InvestmentCreateManyPortfolioInput | InvestmentCreateManyPortfolioInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutPortfolioInput = {
    id?: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
    stock: StockTableCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutPortfolioInput = {
    id?: string
    stock_id: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutPortfolioInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutPortfolioInput, TransactionUncheckedCreateWithoutPortfolioInput>
  }

  export type TransactionCreateManyPortfolioInputEnvelope = {
    data: TransactionCreateManyPortfolioInput | TransactionCreateManyPortfolioInput[]
    skipDuplicates?: boolean
  }

  export type Trade_requestCreateWithoutPortfolioInput = {
    id?: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    response?: string | null
    createdAt?: Date | string
    stock: StockTableCreateNestedOneWithoutTrade_requestInput
    approved?: ManagerCreateNestedOneWithoutApprovedByInput
  }

  export type Trade_requestUncheckedCreateWithoutPortfolioInput = {
    id?: string
    stock_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    approved_by?: string | null
    response?: string | null
    createdAt?: Date | string
  }

  export type Trade_requestCreateOrConnectWithoutPortfolioInput = {
    where: Trade_requestWhereUniqueInput
    create: XOR<Trade_requestCreateWithoutPortfolioInput, Trade_requestUncheckedCreateWithoutPortfolioInput>
  }

  export type Trade_requestCreateManyPortfolioInputEnvelope = {
    data: Trade_requestCreateManyPortfolioInput | Trade_requestCreateManyPortfolioInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPortfolioInput = {
    update: XOR<UserUpdateWithoutPortfolioInput, UserUncheckedUpdateWithoutPortfolioInput>
    create: XOR<UserCreateWithoutPortfolioInput, UserUncheckedCreateWithoutPortfolioInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPortfolioInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPortfolioInput, UserUncheckedUpdateWithoutPortfolioInput>
  }

  export type UserUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    manager?: ManagerUpdateOneWithoutUserNestedInput
    client_manager?: ManagerUpdateOneWithoutManaged_byNestedInput
    to_admin?: AdminUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    manager?: ManagerUncheckedUpdateOneWithoutUserNestedInput
    to_admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput
  }

  export type InvestmentUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: InvestmentWhereUniqueInput
    update: XOR<InvestmentUpdateWithoutPortfolioInput, InvestmentUncheckedUpdateWithoutPortfolioInput>
    create: XOR<InvestmentCreateWithoutPortfolioInput, InvestmentUncheckedCreateWithoutPortfolioInput>
  }

  export type InvestmentUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: InvestmentWhereUniqueInput
    data: XOR<InvestmentUpdateWithoutPortfolioInput, InvestmentUncheckedUpdateWithoutPortfolioInput>
  }

  export type InvestmentUpdateManyWithWhereWithoutPortfolioInput = {
    where: InvestmentScalarWhereInput
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutPortfolioInput, TransactionUncheckedUpdateWithoutPortfolioInput>
    create: XOR<TransactionCreateWithoutPortfolioInput, TransactionUncheckedCreateWithoutPortfolioInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutPortfolioInput, TransactionUncheckedUpdateWithoutPortfolioInput>
  }

  export type TransactionUpdateManyWithWhereWithoutPortfolioInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type Trade_requestUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: Trade_requestWhereUniqueInput
    update: XOR<Trade_requestUpdateWithoutPortfolioInput, Trade_requestUncheckedUpdateWithoutPortfolioInput>
    create: XOR<Trade_requestCreateWithoutPortfolioInput, Trade_requestUncheckedCreateWithoutPortfolioInput>
  }

  export type Trade_requestUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: Trade_requestWhereUniqueInput
    data: XOR<Trade_requestUpdateWithoutPortfolioInput, Trade_requestUncheckedUpdateWithoutPortfolioInput>
  }

  export type Trade_requestUpdateManyWithWhereWithoutPortfolioInput = {
    where: Trade_requestScalarWhereInput
    data: XOR<Trade_requestUpdateManyMutationInput, Trade_requestUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type PortfolioCreateWithoutInvestmentInput = {
    id?: string
    user: UserCreateNestedOneWithoutPortfolioInput
    transaction?: TransactionCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutInvestmentInput = {
    id?: string
    user_id: string
    transaction?: TransactionUncheckedCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutInvestmentInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutInvestmentInput, PortfolioUncheckedCreateWithoutInvestmentInput>
  }

  export type StockTableCreateWithoutInvestmentInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: TransactionCreateNestedManyWithoutStockInput
    trade_request?: Trade_requestCreateNestedManyWithoutStockInput
  }

  export type StockTableUncheckedCreateWithoutInvestmentInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction?: TransactionUncheckedCreateNestedManyWithoutStockInput
    trade_request?: Trade_requestUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockTableCreateOrConnectWithoutInvestmentInput = {
    where: StockTableWhereUniqueInput
    create: XOR<StockTableCreateWithoutInvestmentInput, StockTableUncheckedCreateWithoutInvestmentInput>
  }

  export type PortfolioUpsertWithoutInvestmentInput = {
    update: XOR<PortfolioUpdateWithoutInvestmentInput, PortfolioUncheckedUpdateWithoutInvestmentInput>
    create: XOR<PortfolioCreateWithoutInvestmentInput, PortfolioUncheckedCreateWithoutInvestmentInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutInvestmentInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutInvestmentInput, PortfolioUncheckedUpdateWithoutInvestmentInput>
  }

  export type PortfolioUpdateWithoutInvestmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPortfolioNestedInput
    transaction?: TransactionUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutInvestmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    transaction?: TransactionUncheckedUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type StockTableUpsertWithoutInvestmentInput = {
    update: XOR<StockTableUpdateWithoutInvestmentInput, StockTableUncheckedUpdateWithoutInvestmentInput>
    create: XOR<StockTableCreateWithoutInvestmentInput, StockTableUncheckedCreateWithoutInvestmentInput>
    where?: StockTableWhereInput
  }

  export type StockTableUpdateToOneWithWhereWithoutInvestmentInput = {
    where?: StockTableWhereInput
    data: XOR<StockTableUpdateWithoutInvestmentInput, StockTableUncheckedUpdateWithoutInvestmentInput>
  }

  export type StockTableUpdateWithoutInvestmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUpdateManyWithoutStockNestedInput
    trade_request?: Trade_requestUpdateManyWithoutStockNestedInput
  }

  export type StockTableUncheckedUpdateWithoutInvestmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUncheckedUpdateManyWithoutStockNestedInput
    trade_request?: Trade_requestUncheckedUpdateManyWithoutStockNestedInput
  }

  export type PortfolioCreateWithoutTransactionInput = {
    id?: string
    user: UserCreateNestedOneWithoutPortfolioInput
    investment?: InvestmentCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutTransactionInput = {
    id?: string
    user_id: string
    investment?: InvestmentUncheckedCreateNestedManyWithoutPortfolioInput
    trade_request?: Trade_requestUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutTransactionInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutTransactionInput, PortfolioUncheckedCreateWithoutTransactionInput>
  }

  export type StockTableCreateWithoutTransactionInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    investment?: InvestmentCreateNestedManyWithoutStockInput
    trade_request?: Trade_requestCreateNestedManyWithoutStockInput
  }

  export type StockTableUncheckedCreateWithoutTransactionInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    investment?: InvestmentUncheckedCreateNestedManyWithoutStockInput
    trade_request?: Trade_requestUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockTableCreateOrConnectWithoutTransactionInput = {
    where: StockTableWhereUniqueInput
    create: XOR<StockTableCreateWithoutTransactionInput, StockTableUncheckedCreateWithoutTransactionInput>
  }

  export type PortfolioUpsertWithoutTransactionInput = {
    update: XOR<PortfolioUpdateWithoutTransactionInput, PortfolioUncheckedUpdateWithoutTransactionInput>
    create: XOR<PortfolioCreateWithoutTransactionInput, PortfolioUncheckedCreateWithoutTransactionInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutTransactionInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutTransactionInput, PortfolioUncheckedUpdateWithoutTransactionInput>
  }

  export type PortfolioUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPortfolioNestedInput
    investment?: InvestmentUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    investment?: InvestmentUncheckedUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type StockTableUpsertWithoutTransactionInput = {
    update: XOR<StockTableUpdateWithoutTransactionInput, StockTableUncheckedUpdateWithoutTransactionInput>
    create: XOR<StockTableCreateWithoutTransactionInput, StockTableUncheckedCreateWithoutTransactionInput>
    where?: StockTableWhereInput
  }

  export type StockTableUpdateToOneWithWhereWithoutTransactionInput = {
    where?: StockTableWhereInput
    data: XOR<StockTableUpdateWithoutTransactionInput, StockTableUncheckedUpdateWithoutTransactionInput>
  }

  export type StockTableUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investment?: InvestmentUpdateManyWithoutStockNestedInput
    trade_request?: Trade_requestUpdateManyWithoutStockNestedInput
  }

  export type StockTableUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investment?: InvestmentUncheckedUpdateManyWithoutStockNestedInput
    trade_request?: Trade_requestUncheckedUpdateManyWithoutStockNestedInput
  }

  export type PortfolioCreateWithoutTrade_requestInput = {
    id?: string
    user: UserCreateNestedOneWithoutPortfolioInput
    investment?: InvestmentCreateNestedManyWithoutPortfolioInput
    transaction?: TransactionCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutTrade_requestInput = {
    id?: string
    user_id: string
    investment?: InvestmentUncheckedCreateNestedManyWithoutPortfolioInput
    transaction?: TransactionUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutTrade_requestInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutTrade_requestInput, PortfolioUncheckedCreateWithoutTrade_requestInput>
  }

  export type StockTableCreateWithoutTrade_requestInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    investment?: InvestmentCreateNestedManyWithoutStockInput
    transaction?: TransactionCreateNestedManyWithoutStockInput
  }

  export type StockTableUncheckedCreateWithoutTrade_requestInput = {
    id?: string
    symbol: string
    company: string
    price: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string | null
    marketCap?: bigint | number | null
    volume?: string | null
    peRatio?: Decimal | DecimalJsLike | number | string | null
    dividendYield?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: Decimal | DecimalJsLike | number | string | null
    currency?: string
    exchange?: string | null
    lastUpdated?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    investment?: InvestmentUncheckedCreateNestedManyWithoutStockInput
    transaction?: TransactionUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockTableCreateOrConnectWithoutTrade_requestInput = {
    where: StockTableWhereUniqueInput
    create: XOR<StockTableCreateWithoutTrade_requestInput, StockTableUncheckedCreateWithoutTrade_requestInput>
  }

  export type ManagerCreateWithoutApprovedByInput = {
    id?: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutManagerInput
    managed_by?: UserCreateNestedManyWithoutClient_managerInput
  }

  export type ManagerUncheckedCreateWithoutApprovedByInput = {
    id?: string
    manager_id: string
    approval_code: string
    client_id?: string | null
    manager_slot?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    managed_by?: UserUncheckedCreateNestedManyWithoutClient_managerInput
  }

  export type ManagerCreateOrConnectWithoutApprovedByInput = {
    where: ManagerWhereUniqueInput
    create: XOR<ManagerCreateWithoutApprovedByInput, ManagerUncheckedCreateWithoutApprovedByInput>
  }

  export type PortfolioUpsertWithoutTrade_requestInput = {
    update: XOR<PortfolioUpdateWithoutTrade_requestInput, PortfolioUncheckedUpdateWithoutTrade_requestInput>
    create: XOR<PortfolioCreateWithoutTrade_requestInput, PortfolioUncheckedCreateWithoutTrade_requestInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutTrade_requestInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutTrade_requestInput, PortfolioUncheckedUpdateWithoutTrade_requestInput>
  }

  export type PortfolioUpdateWithoutTrade_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPortfolioNestedInput
    investment?: InvestmentUpdateManyWithoutPortfolioNestedInput
    transaction?: TransactionUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutTrade_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    investment?: InvestmentUncheckedUpdateManyWithoutPortfolioNestedInput
    transaction?: TransactionUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type StockTableUpsertWithoutTrade_requestInput = {
    update: XOR<StockTableUpdateWithoutTrade_requestInput, StockTableUncheckedUpdateWithoutTrade_requestInput>
    create: XOR<StockTableCreateWithoutTrade_requestInput, StockTableUncheckedCreateWithoutTrade_requestInput>
    where?: StockTableWhereInput
  }

  export type StockTableUpdateToOneWithWhereWithoutTrade_requestInput = {
    where?: StockTableWhereInput
    data: XOR<StockTableUpdateWithoutTrade_requestInput, StockTableUncheckedUpdateWithoutTrade_requestInput>
  }

  export type StockTableUpdateWithoutTrade_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investment?: InvestmentUpdateManyWithoutStockNestedInput
    transaction?: TransactionUpdateManyWithoutStockNestedInput
  }

  export type StockTableUncheckedUpdateWithoutTrade_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    marketCap?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    peRatio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    dividendYield?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekLow?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fiftyTwoWeekHigh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange?: NullableStringFieldUpdateOperationsInput | string | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investment?: InvestmentUncheckedUpdateManyWithoutStockNestedInput
    transaction?: TransactionUncheckedUpdateManyWithoutStockNestedInput
  }

  export type ManagerUpsertWithoutApprovedByInput = {
    update: XOR<ManagerUpdateWithoutApprovedByInput, ManagerUncheckedUpdateWithoutApprovedByInput>
    create: XOR<ManagerCreateWithoutApprovedByInput, ManagerUncheckedCreateWithoutApprovedByInput>
    where?: ManagerWhereInput
  }

  export type ManagerUpdateToOneWithWhereWithoutApprovedByInput = {
    where?: ManagerWhereInput
    data: XOR<ManagerUpdateWithoutApprovedByInput, ManagerUncheckedUpdateWithoutApprovedByInput>
  }

  export type ManagerUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutManagerNestedInput
    managed_by?: UserUpdateManyWithoutClient_managerNestedInput
  }

  export type ManagerUncheckedUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    manager_id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    manager_slot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managed_by?: UserUncheckedUpdateManyWithoutClient_managerNestedInput
  }

  export type UserCreateWithoutRefreshTokenInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioCreateNestedManyWithoutUserInput
    manager?: ManagerCreateNestedOneWithoutUserInput
    client_manager?: ManagerCreateNestedOneWithoutManaged_byInput
    to_admin?: AdminCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerCreateNestedOneWithoutManagerInput
  }

  export type UserUncheckedCreateWithoutRefreshTokenInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    manager?: ManagerUncheckedCreateNestedOneWithoutUserInput
    to_admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminUncheckedCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput
  }

  export type UserCreateOrConnectWithoutRefreshTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
  }

  export type UserUpsertWithoutRefreshTokenInput = {
    update: XOR<UserUpdateWithoutRefreshTokenInput, UserUncheckedUpdateWithoutRefreshTokenInput>
    create: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokenInput, UserUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type UserUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUpdateManyWithoutUserNestedInput
    manager?: ManagerUpdateOneWithoutUserNestedInput
    client_manager?: ManagerUpdateOneWithoutManaged_byNestedInput
    to_admin?: AdminUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    manager?: ManagerUncheckedUpdateOneWithoutUserNestedInput
    to_admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput
  }

  export type UserCreateWithoutManagerInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    client_manager?: ManagerCreateNestedOneWithoutManaged_byInput
    to_admin?: AdminCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerCreateNestedOneWithoutManagerInput
  }

  export type UserUncheckedCreateWithoutManagerInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    to_admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminUncheckedCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput
  }

  export type UserCreateOrConnectWithoutManagerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
  }

  export type UserCreateWithoutClient_managerInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    manager?: ManagerCreateNestedOneWithoutUserInput
    to_admin?: AdminCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerCreateNestedOneWithoutManagerInput
  }

  export type UserUncheckedCreateWithoutClient_managerInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    manager?: ManagerUncheckedCreateNestedOneWithoutUserInput
    to_admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminUncheckedCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput
  }

  export type UserCreateOrConnectWithoutClient_managerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClient_managerInput, UserUncheckedCreateWithoutClient_managerInput>
  }

  export type UserCreateManyClient_managerInputEnvelope = {
    data: UserCreateManyClient_managerInput | UserCreateManyClient_managerInput[]
    skipDuplicates?: boolean
  }

  export type Trade_requestCreateWithoutApprovedInput = {
    id?: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    response?: string | null
    createdAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutTrade_requestInput
    stock: StockTableCreateNestedOneWithoutTrade_requestInput
  }

  export type Trade_requestUncheckedCreateWithoutApprovedInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    response?: string | null
    createdAt?: Date | string
  }

  export type Trade_requestCreateOrConnectWithoutApprovedInput = {
    where: Trade_requestWhereUniqueInput
    create: XOR<Trade_requestCreateWithoutApprovedInput, Trade_requestUncheckedCreateWithoutApprovedInput>
  }

  export type Trade_requestCreateManyApprovedInputEnvelope = {
    data: Trade_requestCreateManyApprovedInput | Trade_requestCreateManyApprovedInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutManagerInput = {
    update: XOR<UserUpdateWithoutManagerInput, UserUncheckedUpdateWithoutManagerInput>
    create: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutManagerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutManagerInput, UserUncheckedUpdateWithoutManagerInput>
  }

  export type UserUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    client_manager?: ManagerUpdateOneWithoutManaged_byNestedInput
    to_admin?: AdminUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    to_admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutClient_managerInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutClient_managerInput, UserUncheckedUpdateWithoutClient_managerInput>
    create: XOR<UserCreateWithoutClient_managerInput, UserUncheckedCreateWithoutClient_managerInput>
  }

  export type UserUpdateWithWhereUniqueWithoutClient_managerInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutClient_managerInput, UserUncheckedUpdateWithoutClient_managerInput>
  }

  export type UserUpdateManyWithWhereWithoutClient_managerInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutClient_managerInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    fullname?: StringFilter<"User"> | string
    roles?: EnumRolesFilter<"User"> | $Enums.Roles
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    manager_id?: StringNullableFilter<"User"> | string | null
    restricted?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    verificationTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type Trade_requestUpsertWithWhereUniqueWithoutApprovedInput = {
    where: Trade_requestWhereUniqueInput
    update: XOR<Trade_requestUpdateWithoutApprovedInput, Trade_requestUncheckedUpdateWithoutApprovedInput>
    create: XOR<Trade_requestCreateWithoutApprovedInput, Trade_requestUncheckedCreateWithoutApprovedInput>
  }

  export type Trade_requestUpdateWithWhereUniqueWithoutApprovedInput = {
    where: Trade_requestWhereUniqueInput
    data: XOR<Trade_requestUpdateWithoutApprovedInput, Trade_requestUncheckedUpdateWithoutApprovedInput>
  }

  export type Trade_requestUpdateManyWithWhereWithoutApprovedInput = {
    where: Trade_requestScalarWhereInput
    data: XOR<Trade_requestUpdateManyMutationInput, Trade_requestUncheckedUpdateManyWithoutApprovedInput>
  }

  export type UserCreateWithoutTo_adminInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    manager?: ManagerCreateNestedOneWithoutUserInput
    client_manager?: ManagerCreateNestedOneWithoutManaged_byInput
    add_admin?: Approved_AdminCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerCreateNestedOneWithoutManagerInput
  }

  export type UserUncheckedCreateWithoutTo_adminInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    manager?: ManagerUncheckedCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminUncheckedCreateNestedOneWithoutAdminInput
    Approved_Manager?: Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput
  }

  export type UserCreateOrConnectWithoutTo_adminInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTo_adminInput, UserUncheckedCreateWithoutTo_adminInput>
  }

  export type Approved_ManagerCreateWithoutAdminInput = {
    id?: string
    approval_code: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    manager: UserCreateNestedOneWithoutApproved_ManagerInput
  }

  export type Approved_ManagerUncheckedCreateWithoutAdminInput = {
    id?: string
    approval_code: string
    user_id: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_ManagerCreateOrConnectWithoutAdminInput = {
    where: Approved_ManagerWhereUniqueInput
    create: XOR<Approved_ManagerCreateWithoutAdminInput, Approved_ManagerUncheckedCreateWithoutAdminInput>
  }

  export type Approved_ManagerCreateManyAdminInputEnvelope = {
    data: Approved_ManagerCreateManyAdminInput | Approved_ManagerCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type Approved_AdminCreateWithoutSuperAdminInput = {
    id?: string
    approval_code: string
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin?: UserCreateNestedOneWithoutAdd_adminInput
  }

  export type Approved_AdminUncheckedCreateWithoutSuperAdminInput = {
    id?: string
    approval_code: string
    admin_id?: string | null
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_AdminCreateOrConnectWithoutSuperAdminInput = {
    where: Approved_AdminWhereUniqueInput
    create: XOR<Approved_AdminCreateWithoutSuperAdminInput, Approved_AdminUncheckedCreateWithoutSuperAdminInput>
  }

  export type Approved_AdminCreateManySuperAdminInputEnvelope = {
    data: Approved_AdminCreateManySuperAdminInput | Approved_AdminCreateManySuperAdminInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTo_adminInput = {
    update: XOR<UserUpdateWithoutTo_adminInput, UserUncheckedUpdateWithoutTo_adminInput>
    create: XOR<UserCreateWithoutTo_adminInput, UserUncheckedCreateWithoutTo_adminInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTo_adminInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTo_adminInput, UserUncheckedUpdateWithoutTo_adminInput>
  }

  export type UserUpdateWithoutTo_adminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    manager?: ManagerUpdateOneWithoutUserNestedInput
    client_manager?: ManagerUpdateOneWithoutManaged_byNestedInput
    add_admin?: Approved_AdminUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateWithoutTo_adminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    manager?: ManagerUncheckedUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput
  }

  export type Approved_ManagerUpsertWithWhereUniqueWithoutAdminInput = {
    where: Approved_ManagerWhereUniqueInput
    update: XOR<Approved_ManagerUpdateWithoutAdminInput, Approved_ManagerUncheckedUpdateWithoutAdminInput>
    create: XOR<Approved_ManagerCreateWithoutAdminInput, Approved_ManagerUncheckedCreateWithoutAdminInput>
  }

  export type Approved_ManagerUpdateWithWhereUniqueWithoutAdminInput = {
    where: Approved_ManagerWhereUniqueInput
    data: XOR<Approved_ManagerUpdateWithoutAdminInput, Approved_ManagerUncheckedUpdateWithoutAdminInput>
  }

  export type Approved_ManagerUpdateManyWithWhereWithoutAdminInput = {
    where: Approved_ManagerScalarWhereInput
    data: XOR<Approved_ManagerUpdateManyMutationInput, Approved_ManagerUncheckedUpdateManyWithoutAdminInput>
  }

  export type Approved_ManagerScalarWhereInput = {
    AND?: Approved_ManagerScalarWhereInput | Approved_ManagerScalarWhereInput[]
    OR?: Approved_ManagerScalarWhereInput[]
    NOT?: Approved_ManagerScalarWhereInput | Approved_ManagerScalarWhereInput[]
    id?: StringFilter<"Approved_Manager"> | string
    approval_code?: StringFilter<"Approved_Manager"> | string
    user_id?: StringFilter<"Approved_Manager"> | string
    admin_id?: StringFilter<"Approved_Manager"> | string
    manager_slot?: IntFilter<"Approved_Manager"> | number
    is_used?: BoolFilter<"Approved_Manager"> | boolean
    createdAt?: DateTimeFilter<"Approved_Manager"> | Date | string
    updatedAt?: DateTimeFilter<"Approved_Manager"> | Date | string
  }

  export type Approved_AdminUpsertWithWhereUniqueWithoutSuperAdminInput = {
    where: Approved_AdminWhereUniqueInput
    update: XOR<Approved_AdminUpdateWithoutSuperAdminInput, Approved_AdminUncheckedUpdateWithoutSuperAdminInput>
    create: XOR<Approved_AdminCreateWithoutSuperAdminInput, Approved_AdminUncheckedCreateWithoutSuperAdminInput>
  }

  export type Approved_AdminUpdateWithWhereUniqueWithoutSuperAdminInput = {
    where: Approved_AdminWhereUniqueInput
    data: XOR<Approved_AdminUpdateWithoutSuperAdminInput, Approved_AdminUncheckedUpdateWithoutSuperAdminInput>
  }

  export type Approved_AdminUpdateManyWithWhereWithoutSuperAdminInput = {
    where: Approved_AdminScalarWhereInput
    data: XOR<Approved_AdminUpdateManyMutationInput, Approved_AdminUncheckedUpdateManyWithoutSuperAdminInput>
  }

  export type Approved_AdminScalarWhereInput = {
    AND?: Approved_AdminScalarWhereInput | Approved_AdminScalarWhereInput[]
    OR?: Approved_AdminScalarWhereInput[]
    NOT?: Approved_AdminScalarWhereInput | Approved_AdminScalarWhereInput[]
    id?: StringFilter<"Approved_Admin"> | string
    approval_code?: StringFilter<"Approved_Admin"> | string
    admin_id?: StringNullableFilter<"Approved_Admin"> | string | null
    superAdmin_id?: StringFilter<"Approved_Admin"> | string
    is_used?: BoolFilter<"Approved_Admin"> | boolean
    createdAt?: DateTimeFilter<"Approved_Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Approved_Admin"> | Date | string
  }

  export type UserCreateWithoutApproved_ManagerInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    manager?: ManagerCreateNestedOneWithoutUserInput
    client_manager?: ManagerCreateNestedOneWithoutManaged_byInput
    to_admin?: AdminCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminCreateNestedOneWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutApproved_ManagerInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    manager?: ManagerUncheckedCreateNestedOneWithoutUserInput
    to_admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    add_admin?: Approved_AdminUncheckedCreateNestedOneWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutApproved_ManagerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApproved_ManagerInput, UserUncheckedCreateWithoutApproved_ManagerInput>
  }

  export type AdminCreateWithoutAdmin_idInput = {
    id?: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTo_adminInput
    super_admin_id?: Approved_AdminCreateNestedManyWithoutSuperAdminInput
  }

  export type AdminUncheckedCreateWithoutAdmin_idInput = {
    id?: string
    user_id: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    super_admin_id?: Approved_AdminUncheckedCreateNestedManyWithoutSuperAdminInput
  }

  export type AdminCreateOrConnectWithoutAdmin_idInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutAdmin_idInput, AdminUncheckedCreateWithoutAdmin_idInput>
  }

  export type UserUpsertWithoutApproved_ManagerInput = {
    update: XOR<UserUpdateWithoutApproved_ManagerInput, UserUncheckedUpdateWithoutApproved_ManagerInput>
    create: XOR<UserCreateWithoutApproved_ManagerInput, UserUncheckedCreateWithoutApproved_ManagerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApproved_ManagerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApproved_ManagerInput, UserUncheckedUpdateWithoutApproved_ManagerInput>
  }

  export type UserUpdateWithoutApproved_ManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    manager?: ManagerUpdateOneWithoutUserNestedInput
    client_manager?: ManagerUpdateOneWithoutManaged_byNestedInput
    to_admin?: AdminUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUpdateOneWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutApproved_ManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    manager?: ManagerUncheckedUpdateOneWithoutUserNestedInput
    to_admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput
  }

  export type AdminUpsertWithoutAdmin_idInput = {
    update: XOR<AdminUpdateWithoutAdmin_idInput, AdminUncheckedUpdateWithoutAdmin_idInput>
    create: XOR<AdminCreateWithoutAdmin_idInput, AdminUncheckedCreateWithoutAdmin_idInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutAdmin_idInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutAdmin_idInput, AdminUncheckedUpdateWithoutAdmin_idInput>
  }

  export type AdminUpdateWithoutAdmin_idInput = {
    id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTo_adminNestedInput
    super_admin_id?: Approved_AdminUpdateManyWithoutSuperAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutAdmin_idInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    super_admin_id?: Approved_AdminUncheckedUpdateManyWithoutSuperAdminNestedInput
  }

  export type UserCreateWithoutAdd_adminInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    manager?: ManagerCreateNestedOneWithoutUserInput
    client_manager?: ManagerCreateNestedOneWithoutManaged_byInput
    to_admin?: AdminCreateNestedOneWithoutUserInput
    Approved_Manager?: Approved_ManagerCreateNestedOneWithoutManagerInput
  }

  export type UserUncheckedCreateWithoutAdd_adminInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    manager_id?: string | null
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
    portfolio?: PortfolioUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    manager?: ManagerUncheckedCreateNestedOneWithoutUserInput
    to_admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    Approved_Manager?: Approved_ManagerUncheckedCreateNestedOneWithoutManagerInput
  }

  export type UserCreateOrConnectWithoutAdd_adminInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdd_adminInput, UserUncheckedCreateWithoutAdd_adminInput>
  }

  export type AdminCreateWithoutSuper_admin_idInput = {
    id?: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTo_adminInput
    admin_id?: Approved_ManagerCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateWithoutSuper_admin_idInput = {
    id?: string
    user_id: string
    super_admin_access?: string | null
    super_admin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    admin_id?: Approved_ManagerUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminCreateOrConnectWithoutSuper_admin_idInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutSuper_admin_idInput, AdminUncheckedCreateWithoutSuper_admin_idInput>
  }

  export type UserUpsertWithoutAdd_adminInput = {
    update: XOR<UserUpdateWithoutAdd_adminInput, UserUncheckedUpdateWithoutAdd_adminInput>
    create: XOR<UserCreateWithoutAdd_adminInput, UserUncheckedCreateWithoutAdd_adminInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdd_adminInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdd_adminInput, UserUncheckedUpdateWithoutAdd_adminInput>
  }

  export type UserUpdateWithoutAdd_adminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    manager?: ManagerUpdateOneWithoutUserNestedInput
    client_manager?: ManagerUpdateOneWithoutManaged_byNestedInput
    to_admin?: AdminUpdateOneWithoutUserNestedInput
    Approved_Manager?: Approved_ManagerUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateWithoutAdd_adminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager_id?: NullableStringFieldUpdateOperationsInput | string | null
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    manager?: ManagerUncheckedUpdateOneWithoutUserNestedInput
    to_admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    Approved_Manager?: Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput
  }

  export type AdminUpsertWithoutSuper_admin_idInput = {
    update: XOR<AdminUpdateWithoutSuper_admin_idInput, AdminUncheckedUpdateWithoutSuper_admin_idInput>
    create: XOR<AdminCreateWithoutSuper_admin_idInput, AdminUncheckedCreateWithoutSuper_admin_idInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutSuper_admin_idInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutSuper_admin_idInput, AdminUncheckedUpdateWithoutSuper_admin_idInput>
  }

  export type AdminUpdateWithoutSuper_admin_idInput = {
    id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTo_adminNestedInput
    admin_id?: Approved_ManagerUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutSuper_admin_idInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    super_admin_access?: NullableStringFieldUpdateOperationsInput | string | null
    super_admin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_id?: Approved_ManagerUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type PortfolioCreateManyUserInput = {
    id?: string
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    investment?: InvestmentUpdateManyWithoutPortfolioNestedInput
    transaction?: TransactionUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    investment?: InvestmentUncheckedUpdateManyWithoutPortfolioNestedInput
    transaction?: TransactionUncheckedUpdateManyWithoutPortfolioNestedInput
    trade_request?: Trade_requestUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentCreateManyStockInput = {
    id?: string
    portfolio_id: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyStockInput = {
    id?: string
    portfolio_id: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
  }

  export type Trade_requestCreateManyStockInput = {
    id?: string
    portfolio_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    approved_by?: string | null
    response?: string | null
    createdAt?: Date | string
  }

  export type InvestmentUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutInvestmentNestedInput
  }

  export type InvestmentUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutTrade_requestNestedInput
    approved?: ManagerUpdateOneWithoutApprovedByNestedInput
  }

  export type Trade_requestUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentCreateManyPortfolioInput = {
    id?: string
    stock_id: string
    quantity: number
    avgPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyPortfolioInput = {
    id?: string
    stock_id: string
    quantity: number
    price: Decimal | DecimalJsLike | number | string
    type: $Enums.TransactionType
    createdAt?: Date | string
  }

  export type Trade_requestCreateManyPortfolioInput = {
    id?: string
    stock_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    approved_by?: string | null
    response?: string | null
    createdAt?: Date | string
  }

  export type InvestmentUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockTableUpdateOneRequiredWithoutInvestmentNestedInput
  }

  export type InvestmentUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    avgPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockTableUpdateOneRequiredWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockTableUpdateOneRequiredWithoutTrade_requestNestedInput
    approved?: ManagerUpdateOneWithoutApprovedByNestedInput
  }

  export type Trade_requestUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyClient_managerInput = {
    id?: string
    email: string
    username: string
    password: string
    fullname: string
    roles?: $Enums.Roles
    createdAt?: Date | string
    updatedAt?: Date | string
    restricted?: boolean
    isVerified?: boolean
    verificationToken?: string | null
    verificationTokenExpires?: Date | string | null
  }

  export type Trade_requestCreateManyApprovedInput = {
    id?: string
    portfolio_id: string
    stock_id: string
    quantity: number
    status?: $Enums.Status
    type: $Enums.TransactionType
    response?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateWithoutClient_managerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    manager?: ManagerUpdateOneWithoutUserNestedInput
    to_admin?: AdminUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateWithoutClient_managerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    portfolio?: PortfolioUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    manager?: ManagerUncheckedUpdateOneWithoutUserNestedInput
    to_admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    add_admin?: Approved_AdminUncheckedUpdateOneWithoutAdminNestedInput
    Approved_Manager?: Approved_ManagerUncheckedUpdateOneWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateManyWithoutClient_managerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    roles?: EnumRolesFieldUpdateOperationsInput | $Enums.Roles
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restricted?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type Trade_requestUpdateWithoutApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutTrade_requestNestedInput
    stock?: StockTableUpdateOneRequiredWithoutTrade_requestNestedInput
  }

  export type Trade_requestUncheckedUpdateWithoutApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Trade_requestUncheckedUpdateManyWithoutApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolio_id?: StringFieldUpdateOperationsInput | string
    stock_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    response?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_ManagerCreateManyAdminInput = {
    id?: string
    approval_code: string
    user_id: string
    manager_slot?: number
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_AdminCreateManySuperAdminInput = {
    id?: string
    approval_code: string
    admin_id?: string | null
    is_used?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Approved_ManagerUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneRequiredWithoutApproved_ManagerNestedInput
  }

  export type Approved_ManagerUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_ManagerUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    manager_slot?: IntFieldUpdateOperationsInput | number
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_AdminUpdateWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneWithoutAdd_adminNestedInput
  }

  export type Approved_AdminUncheckedUpdateWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Approved_AdminUncheckedUpdateManyWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    approval_code?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
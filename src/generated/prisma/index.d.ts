
/**
 * Client
**/

import * as runtime from './runtime/library.js';
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
 * Model EmailSubscription
 * 
 */
export type EmailSubscription = $Result.DefaultSelection<Prisma.$EmailSubscriptionPayload>
/**
 * Model Promoter
 * 
 */
export type Promoter = $Result.DefaultSelection<Prisma.$PromoterPayload>
/**
 * Model Festival
 * 
 */
export type Festival = $Result.DefaultSelection<Prisma.$FestivalPayload>
/**
 * Model Artist
 * 
 */
export type Artist = $Result.DefaultSelection<Prisma.$ArtistPayload>
/**
 * Model LineupEntry
 * 
 */
export type LineupEntry = $Result.DefaultSelection<Prisma.$LineupEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Region: {
  NORTHLAND: 'NORTHLAND',
  AUCKLAND: 'AUCKLAND',
  WAIKATO: 'WAIKATO',
  BAY_OF_PLENTY: 'BAY_OF_PLENTY',
  GISBORNE: 'GISBORNE',
  HAWKES_BAY: 'HAWKES_BAY',
  TARANAKI: 'TARANAKI',
  MANAWATU_WHANGANUI: 'MANAWATU_WHANGANUI',
  WELLINGTON: 'WELLINGTON',
  WAIRARAPA: 'WAIRARAPA',
  TASMAN: 'TASMAN',
  NELSON: 'NELSON',
  MARLBOROUGH: 'MARLBOROUGH',
  WEST_COAST: 'WEST_COAST',
  CANTERBURY: 'CANTERBURY',
  OTAGO: 'OTAGO',
  SOUTHLAND: 'SOUTHLAND',
  ONLINE: 'ONLINE'
};

export type Region = (typeof Region)[keyof typeof Region]


export const FestivalStatus: {
  ACTIVE: 'ACTIVE',
  TBC: 'TBC',
  HIATUS: 'HIATUS',
  DEFUNCT: 'DEFUNCT',
  UNCONFIRMED: 'UNCONFIRMED'
};

export type FestivalStatus = (typeof FestivalStatus)[keyof typeof FestivalStatus]


export const UserRole: {
  ADMIN: 'ADMIN',
  ORGANISER: 'ORGANISER',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type Region = $Enums.Region

export const Region: typeof $Enums.Region

export type FestivalStatus = $Enums.FestivalStatus

export const FestivalStatus: typeof $Enums.FestivalStatus

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
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
   * `prisma.emailSubscription`: Exposes CRUD operations for the **EmailSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailSubscriptions
    * const emailSubscriptions = await prisma.emailSubscription.findMany()
    * ```
    */
  get emailSubscription(): Prisma.EmailSubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promoter`: Exposes CRUD operations for the **Promoter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promoters
    * const promoters = await prisma.promoter.findMany()
    * ```
    */
  get promoter(): Prisma.PromoterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.festival`: Exposes CRUD operations for the **Festival** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Festivals
    * const festivals = await prisma.festival.findMany()
    * ```
    */
  get festival(): Prisma.FestivalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artist`: Exposes CRUD operations for the **Artist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artists
    * const artists = await prisma.artist.findMany()
    * ```
    */
  get artist(): Prisma.ArtistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lineupEntry`: Exposes CRUD operations for the **LineupEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LineupEntries
    * const lineupEntries = await prisma.lineupEntry.findMany()
    * ```
    */
  get lineupEntry(): Prisma.LineupEntryDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
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
    EmailSubscription: 'EmailSubscription',
    Promoter: 'Promoter',
    Festival: 'Festival',
    Artist: 'Artist',
    LineupEntry: 'LineupEntry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "emailSubscription" | "promoter" | "festival" | "artist" | "lineupEntry"
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
      EmailSubscription: {
        payload: Prisma.$EmailSubscriptionPayload<ExtArgs>
        fields: Prisma.EmailSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.EmailSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>
          }
          findMany: {
            args: Prisma.EmailSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>[]
          }
          create: {
            args: Prisma.EmailSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>
          }
          createMany: {
            args: Prisma.EmailSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.EmailSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>
          }
          update: {
            args: Prisma.EmailSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.EmailSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.EmailSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.EmailSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailSubscription>
          }
          groupBy: {
            args: Prisma.EmailSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<EmailSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Promoter: {
        payload: Prisma.$PromoterPayload<ExtArgs>
        fields: Prisma.PromoterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>
          }
          findFirst: {
            args: Prisma.PromoterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>
          }
          findMany: {
            args: Prisma.PromoterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>[]
          }
          create: {
            args: Prisma.PromoterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>
          }
          createMany: {
            args: Prisma.PromoterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromoterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>[]
          }
          delete: {
            args: Prisma.PromoterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>
          }
          update: {
            args: Prisma.PromoterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>
          }
          deleteMany: {
            args: Prisma.PromoterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PromoterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>[]
          }
          upsert: {
            args: Prisma.PromoterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoterPayload>
          }
          aggregate: {
            args: Prisma.PromoterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromoter>
          }
          groupBy: {
            args: Prisma.PromoterGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoterGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromoterCountArgs<ExtArgs>
            result: $Utils.Optional<PromoterCountAggregateOutputType> | number
          }
        }
      }
      Festival: {
        payload: Prisma.$FestivalPayload<ExtArgs>
        fields: Prisma.FestivalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FestivalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FestivalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          findFirst: {
            args: Prisma.FestivalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FestivalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          findMany: {
            args: Prisma.FestivalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>[]
          }
          create: {
            args: Prisma.FestivalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          createMany: {
            args: Prisma.FestivalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FestivalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>[]
          }
          delete: {
            args: Prisma.FestivalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          update: {
            args: Prisma.FestivalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          deleteMany: {
            args: Prisma.FestivalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FestivalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FestivalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>[]
          }
          upsert: {
            args: Prisma.FestivalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          aggregate: {
            args: Prisma.FestivalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFestival>
          }
          groupBy: {
            args: Prisma.FestivalGroupByArgs<ExtArgs>
            result: $Utils.Optional<FestivalGroupByOutputType>[]
          }
          count: {
            args: Prisma.FestivalCountArgs<ExtArgs>
            result: $Utils.Optional<FestivalCountAggregateOutputType> | number
          }
        }
      }
      Artist: {
        payload: Prisma.$ArtistPayload<ExtArgs>
        fields: Prisma.ArtistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          findFirst: {
            args: Prisma.ArtistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          findMany: {
            args: Prisma.ArtistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>[]
          }
          create: {
            args: Prisma.ArtistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          createMany: {
            args: Prisma.ArtistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>[]
          }
          delete: {
            args: Prisma.ArtistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          update: {
            args: Prisma.ArtistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          deleteMany: {
            args: Prisma.ArtistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>[]
          }
          upsert: {
            args: Prisma.ArtistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          aggregate: {
            args: Prisma.ArtistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtist>
          }
          groupBy: {
            args: Prisma.ArtistGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtistGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtistCountArgs<ExtArgs>
            result: $Utils.Optional<ArtistCountAggregateOutputType> | number
          }
        }
      }
      LineupEntry: {
        payload: Prisma.$LineupEntryPayload<ExtArgs>
        fields: Prisma.LineupEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LineupEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LineupEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>
          }
          findFirst: {
            args: Prisma.LineupEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LineupEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>
          }
          findMany: {
            args: Prisma.LineupEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>[]
          }
          create: {
            args: Prisma.LineupEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>
          }
          createMany: {
            args: Prisma.LineupEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LineupEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>[]
          }
          delete: {
            args: Prisma.LineupEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>
          }
          update: {
            args: Prisma.LineupEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>
          }
          deleteMany: {
            args: Prisma.LineupEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LineupEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LineupEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>[]
          }
          upsert: {
            args: Prisma.LineupEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LineupEntryPayload>
          }
          aggregate: {
            args: Prisma.LineupEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLineupEntry>
          }
          groupBy: {
            args: Prisma.LineupEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LineupEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LineupEntryCountArgs<ExtArgs>
            result: $Utils.Optional<LineupEntryCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    emailSubscription?: EmailSubscriptionOmit
    promoter?: PromoterOmit
    festival?: FestivalOmit
    artist?: ArtistOmit
    lineupEntry?: LineupEntryOmit
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
    festivals: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festivals?: boolean | UserCountOutputTypeCountFestivalsArgs
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
  export type UserCountOutputTypeCountFestivalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestivalWhereInput
  }


  /**
   * Count Type PromoterCountOutputType
   */

  export type PromoterCountOutputType = {
    festivals: number
  }

  export type PromoterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festivals?: boolean | PromoterCountOutputTypeCountFestivalsArgs
  }

  // Custom InputTypes
  /**
   * PromoterCountOutputType without action
   */
  export type PromoterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoterCountOutputType
     */
    select?: PromoterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PromoterCountOutputType without action
   */
  export type PromoterCountOutputTypeCountFestivalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestivalWhereInput
  }


  /**
   * Count Type FestivalCountOutputType
   */

  export type FestivalCountOutputType = {
    lineups: number
  }

  export type FestivalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineups?: boolean | FestivalCountOutputTypeCountLineupsArgs
  }

  // Custom InputTypes
  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalCountOutputType
     */
    select?: FestivalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeCountLineupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LineupEntryWhereInput
  }


  /**
   * Count Type ArtistCountOutputType
   */

  export type ArtistCountOutputType = {
    lineups: number
  }

  export type ArtistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineups?: boolean | ArtistCountOutputTypeCountLineupsArgs
  }

  // Custom InputTypes
  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistCountOutputType
     */
    select?: ArtistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeCountLineupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LineupEntryWhereInput
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
    name: string | null
    role: $Enums.UserRole | null
    googleUid: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    googleUid: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    googleUid: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    googleUid?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    googleUid?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    googleUid?: true
    createdAt?: true
    updatedAt?: true
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
    name: string | null
    role: $Enums.UserRole
    googleUid: string | null
    createdAt: Date
    updatedAt: Date
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
    name?: boolean
    role?: boolean
    googleUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    festivals?: boolean | User$festivalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    googleUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    googleUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    googleUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "role" | "googleUid" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festivals?: boolean | User$festivalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      festivals: Prisma.$FestivalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      role: $Enums.UserRole
      googleUid: string | null
      createdAt: Date
      updatedAt: Date
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
    festivals<T extends User$festivalsArgs<ExtArgs> = {}>(args?: Subset<T, User$festivalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly googleUid: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
   * User.festivals
   */
  export type User$festivalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    where?: FestivalWhereInput
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    cursor?: FestivalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
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
   * Model EmailSubscription
   */

  export type AggregateEmailSubscription = {
    _count: EmailSubscriptionCountAggregateOutputType | null
    _min: EmailSubscriptionMinAggregateOutputType | null
    _max: EmailSubscriptionMaxAggregateOutputType | null
  }

  export type EmailSubscriptionMinAggregateOutputType = {
    id: string | null
    email: string | null
    region: $Enums.Region | null
    token: string | null
    createdAt: Date | null
  }

  export type EmailSubscriptionMaxAggregateOutputType = {
    id: string | null
    email: string | null
    region: $Enums.Region | null
    token: string | null
    createdAt: Date | null
  }

  export type EmailSubscriptionCountAggregateOutputType = {
    id: number
    email: number
    region: number
    token: number
    createdAt: number
    _all: number
  }


  export type EmailSubscriptionMinAggregateInputType = {
    id?: true
    email?: true
    region?: true
    token?: true
    createdAt?: true
  }

  export type EmailSubscriptionMaxAggregateInputType = {
    id?: true
    email?: true
    region?: true
    token?: true
    createdAt?: true
  }

  export type EmailSubscriptionCountAggregateInputType = {
    id?: true
    email?: true
    region?: true
    token?: true
    createdAt?: true
    _all?: true
  }

  export type EmailSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailSubscription to aggregate.
     */
    where?: EmailSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscriptions to fetch.
     */
    orderBy?: EmailSubscriptionOrderByWithRelationInput | EmailSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailSubscriptions
    **/
    _count?: true | EmailSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailSubscriptionMaxAggregateInputType
  }

  export type GetEmailSubscriptionAggregateType<T extends EmailSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailSubscription[P]>
      : GetScalarType<T[P], AggregateEmailSubscription[P]>
  }




  export type EmailSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailSubscriptionWhereInput
    orderBy?: EmailSubscriptionOrderByWithAggregationInput | EmailSubscriptionOrderByWithAggregationInput[]
    by: EmailSubscriptionScalarFieldEnum[] | EmailSubscriptionScalarFieldEnum
    having?: EmailSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailSubscriptionCountAggregateInputType | true
    _min?: EmailSubscriptionMinAggregateInputType
    _max?: EmailSubscriptionMaxAggregateInputType
  }

  export type EmailSubscriptionGroupByOutputType = {
    id: string
    email: string
    region: $Enums.Region
    token: string
    createdAt: Date
    _count: EmailSubscriptionCountAggregateOutputType | null
    _min: EmailSubscriptionMinAggregateOutputType | null
    _max: EmailSubscriptionMaxAggregateOutputType | null
  }

  type GetEmailSubscriptionGroupByPayload<T extends EmailSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], EmailSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type EmailSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    region?: boolean
    token?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emailSubscription"]>

  export type EmailSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    region?: boolean
    token?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emailSubscription"]>

  export type EmailSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    region?: boolean
    token?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emailSubscription"]>

  export type EmailSubscriptionSelectScalar = {
    id?: boolean
    email?: boolean
    region?: boolean
    token?: boolean
    createdAt?: boolean
  }

  export type EmailSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "region" | "token" | "createdAt", ExtArgs["result"]["emailSubscription"]>

  export type $EmailSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailSubscription"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      region: $Enums.Region
      token: string
      createdAt: Date
    }, ExtArgs["result"]["emailSubscription"]>
    composites: {}
  }

  type EmailSubscriptionGetPayload<S extends boolean | null | undefined | EmailSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$EmailSubscriptionPayload, S>

  type EmailSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailSubscriptionCountAggregateInputType | true
    }

  export interface EmailSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailSubscription'], meta: { name: 'EmailSubscription' } }
    /**
     * Find zero or one EmailSubscription that matches the filter.
     * @param {EmailSubscriptionFindUniqueArgs} args - Arguments to find a EmailSubscription
     * @example
     * // Get one EmailSubscription
     * const emailSubscription = await prisma.emailSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailSubscriptionFindUniqueArgs>(args: SelectSubset<T, EmailSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a EmailSubscription
     * @example
     * // Get one EmailSubscription
     * const emailSubscription = await prisma.emailSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriptionFindFirstArgs} args - Arguments to find a EmailSubscription
     * @example
     * // Get one EmailSubscription
     * const emailSubscription = await prisma.emailSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailSubscriptionFindFirstArgs>(args?: SelectSubset<T, EmailSubscriptionFindFirstArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriptionFindFirstOrThrowArgs} args - Arguments to find a EmailSubscription
     * @example
     * // Get one EmailSubscription
     * const emailSubscription = await prisma.emailSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailSubscriptions
     * const emailSubscriptions = await prisma.emailSubscription.findMany()
     * 
     * // Get first 10 EmailSubscriptions
     * const emailSubscriptions = await prisma.emailSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailSubscriptionWithIdOnly = await prisma.emailSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailSubscriptionFindManyArgs>(args?: SelectSubset<T, EmailSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailSubscription.
     * @param {EmailSubscriptionCreateArgs} args - Arguments to create a EmailSubscription.
     * @example
     * // Create one EmailSubscription
     * const EmailSubscription = await prisma.emailSubscription.create({
     *   data: {
     *     // ... data to create a EmailSubscription
     *   }
     * })
     * 
     */
    create<T extends EmailSubscriptionCreateArgs>(args: SelectSubset<T, EmailSubscriptionCreateArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailSubscriptions.
     * @param {EmailSubscriptionCreateManyArgs} args - Arguments to create many EmailSubscriptions.
     * @example
     * // Create many EmailSubscriptions
     * const emailSubscription = await prisma.emailSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailSubscriptionCreateManyArgs>(args?: SelectSubset<T, EmailSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailSubscriptions and returns the data saved in the database.
     * @param {EmailSubscriptionCreateManyAndReturnArgs} args - Arguments to create many EmailSubscriptions.
     * @example
     * // Create many EmailSubscriptions
     * const emailSubscription = await prisma.emailSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailSubscriptions and only return the `id`
     * const emailSubscriptionWithIdOnly = await prisma.emailSubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailSubscription.
     * @param {EmailSubscriptionDeleteArgs} args - Arguments to delete one EmailSubscription.
     * @example
     * // Delete one EmailSubscription
     * const EmailSubscription = await prisma.emailSubscription.delete({
     *   where: {
     *     // ... filter to delete one EmailSubscription
     *   }
     * })
     * 
     */
    delete<T extends EmailSubscriptionDeleteArgs>(args: SelectSubset<T, EmailSubscriptionDeleteArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailSubscription.
     * @param {EmailSubscriptionUpdateArgs} args - Arguments to update one EmailSubscription.
     * @example
     * // Update one EmailSubscription
     * const emailSubscription = await prisma.emailSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailSubscriptionUpdateArgs>(args: SelectSubset<T, EmailSubscriptionUpdateArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailSubscriptions.
     * @param {EmailSubscriptionDeleteManyArgs} args - Arguments to filter EmailSubscriptions to delete.
     * @example
     * // Delete a few EmailSubscriptions
     * const { count } = await prisma.emailSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailSubscriptionDeleteManyArgs>(args?: SelectSubset<T, EmailSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailSubscriptions
     * const emailSubscription = await prisma.emailSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailSubscriptionUpdateManyArgs>(args: SelectSubset<T, EmailSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailSubscriptions and returns the data updated in the database.
     * @param {EmailSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many EmailSubscriptions.
     * @example
     * // Update many EmailSubscriptions
     * const emailSubscription = await prisma.emailSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailSubscriptions and only return the `id`
     * const emailSubscriptionWithIdOnly = await prisma.emailSubscription.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailSubscription.
     * @param {EmailSubscriptionUpsertArgs} args - Arguments to update or create a EmailSubscription.
     * @example
     * // Update or create a EmailSubscription
     * const emailSubscription = await prisma.emailSubscription.upsert({
     *   create: {
     *     // ... data to create a EmailSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailSubscription we want to update
     *   }
     * })
     */
    upsert<T extends EmailSubscriptionUpsertArgs>(args: SelectSubset<T, EmailSubscriptionUpsertArgs<ExtArgs>>): Prisma__EmailSubscriptionClient<$Result.GetResult<Prisma.$EmailSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriptionCountArgs} args - Arguments to filter EmailSubscriptions to count.
     * @example
     * // Count the number of EmailSubscriptions
     * const count = await prisma.emailSubscription.count({
     *   where: {
     *     // ... the filter for the EmailSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends EmailSubscriptionCountArgs>(
      args?: Subset<T, EmailSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailSubscriptionAggregateArgs>(args: Subset<T, EmailSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetEmailSubscriptionAggregateType<T>>

    /**
     * Group by EmailSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSubscriptionGroupByArgs} args - Group by arguments.
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
      T extends EmailSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: EmailSubscriptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailSubscription model
   */
  readonly fields: EmailSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the EmailSubscription model
   */
  interface EmailSubscriptionFieldRefs {
    readonly id: FieldRef<"EmailSubscription", 'String'>
    readonly email: FieldRef<"EmailSubscription", 'String'>
    readonly region: FieldRef<"EmailSubscription", 'Region'>
    readonly token: FieldRef<"EmailSubscription", 'String'>
    readonly createdAt: FieldRef<"EmailSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailSubscription findUnique
   */
  export type EmailSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscription to fetch.
     */
    where: EmailSubscriptionWhereUniqueInput
  }

  /**
   * EmailSubscription findUniqueOrThrow
   */
  export type EmailSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscription to fetch.
     */
    where: EmailSubscriptionWhereUniqueInput
  }

  /**
   * EmailSubscription findFirst
   */
  export type EmailSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscription to fetch.
     */
    where?: EmailSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscriptions to fetch.
     */
    orderBy?: EmailSubscriptionOrderByWithRelationInput | EmailSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailSubscriptions.
     */
    cursor?: EmailSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailSubscriptions.
     */
    distinct?: EmailSubscriptionScalarFieldEnum | EmailSubscriptionScalarFieldEnum[]
  }

  /**
   * EmailSubscription findFirstOrThrow
   */
  export type EmailSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscription to fetch.
     */
    where?: EmailSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscriptions to fetch.
     */
    orderBy?: EmailSubscriptionOrderByWithRelationInput | EmailSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailSubscriptions.
     */
    cursor?: EmailSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailSubscriptions.
     */
    distinct?: EmailSubscriptionScalarFieldEnum | EmailSubscriptionScalarFieldEnum[]
  }

  /**
   * EmailSubscription findMany
   */
  export type EmailSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which EmailSubscriptions to fetch.
     */
    where?: EmailSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSubscriptions to fetch.
     */
    orderBy?: EmailSubscriptionOrderByWithRelationInput | EmailSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailSubscriptions.
     */
    cursor?: EmailSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSubscriptions.
     */
    skip?: number
    distinct?: EmailSubscriptionScalarFieldEnum | EmailSubscriptionScalarFieldEnum[]
  }

  /**
   * EmailSubscription create
   */
  export type EmailSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to create a EmailSubscription.
     */
    data: XOR<EmailSubscriptionCreateInput, EmailSubscriptionUncheckedCreateInput>
  }

  /**
   * EmailSubscription createMany
   */
  export type EmailSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailSubscriptions.
     */
    data: EmailSubscriptionCreateManyInput | EmailSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailSubscription createManyAndReturn
   */
  export type EmailSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many EmailSubscriptions.
     */
    data: EmailSubscriptionCreateManyInput | EmailSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailSubscription update
   */
  export type EmailSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to update a EmailSubscription.
     */
    data: XOR<EmailSubscriptionUpdateInput, EmailSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which EmailSubscription to update.
     */
    where: EmailSubscriptionWhereUniqueInput
  }

  /**
   * EmailSubscription updateMany
   */
  export type EmailSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailSubscriptions.
     */
    data: XOR<EmailSubscriptionUpdateManyMutationInput, EmailSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which EmailSubscriptions to update
     */
    where?: EmailSubscriptionWhereInput
    /**
     * Limit how many EmailSubscriptions to update.
     */
    limit?: number
  }

  /**
   * EmailSubscription updateManyAndReturn
   */
  export type EmailSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update EmailSubscriptions.
     */
    data: XOR<EmailSubscriptionUpdateManyMutationInput, EmailSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which EmailSubscriptions to update
     */
    where?: EmailSubscriptionWhereInput
    /**
     * Limit how many EmailSubscriptions to update.
     */
    limit?: number
  }

  /**
   * EmailSubscription upsert
   */
  export type EmailSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * The filter to search for the EmailSubscription to update in case it exists.
     */
    where: EmailSubscriptionWhereUniqueInput
    /**
     * In case the EmailSubscription found by the `where` argument doesn't exist, create a new EmailSubscription with this data.
     */
    create: XOR<EmailSubscriptionCreateInput, EmailSubscriptionUncheckedCreateInput>
    /**
     * In case the EmailSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailSubscriptionUpdateInput, EmailSubscriptionUncheckedUpdateInput>
  }

  /**
   * EmailSubscription delete
   */
  export type EmailSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
    /**
     * Filter which EmailSubscription to delete.
     */
    where: EmailSubscriptionWhereUniqueInput
  }

  /**
   * EmailSubscription deleteMany
   */
  export type EmailSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailSubscriptions to delete
     */
    where?: EmailSubscriptionWhereInput
    /**
     * Limit how many EmailSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * EmailSubscription without action
   */
  export type EmailSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSubscription
     */
    select?: EmailSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSubscription
     */
    omit?: EmailSubscriptionOmit<ExtArgs> | null
  }


  /**
   * Model Promoter
   */

  export type AggregatePromoter = {
    _count: PromoterCountAggregateOutputType | null
    _min: PromoterMinAggregateOutputType | null
    _max: PromoterMaxAggregateOutputType | null
  }

  export type PromoterMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    region: string | null
    genreFocus: string | null
    instagram: string | null
    facebook: string | null
    website: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromoterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    region: string | null
    genreFocus: string | null
    instagram: string | null
    facebook: string | null
    website: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromoterCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    region: number
    genreFocus: number
    instagram: number
    facebook: number
    website: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PromoterMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    region?: true
    genreFocus?: true
    instagram?: true
    facebook?: true
    website?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromoterMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    region?: true
    genreFocus?: true
    instagram?: true
    facebook?: true
    website?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromoterCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    region?: true
    genreFocus?: true
    instagram?: true
    facebook?: true
    website?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PromoterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promoter to aggregate.
     */
    where?: PromoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promoters to fetch.
     */
    orderBy?: PromoterOrderByWithRelationInput | PromoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promoters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promoters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Promoters
    **/
    _count?: true | PromoterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoterMaxAggregateInputType
  }

  export type GetPromoterAggregateType<T extends PromoterAggregateArgs> = {
        [P in keyof T & keyof AggregatePromoter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromoter[P]>
      : GetScalarType<T[P], AggregatePromoter[P]>
  }




  export type PromoterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoterWhereInput
    orderBy?: PromoterOrderByWithAggregationInput | PromoterOrderByWithAggregationInput[]
    by: PromoterScalarFieldEnum[] | PromoterScalarFieldEnum
    having?: PromoterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoterCountAggregateInputType | true
    _min?: PromoterMinAggregateInputType
    _max?: PromoterMaxAggregateInputType
  }

  export type PromoterGroupByOutputType = {
    id: string
    name: string
    slug: string
    region: string | null
    genreFocus: string | null
    instagram: string | null
    facebook: string | null
    website: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PromoterCountAggregateOutputType | null
    _min: PromoterMinAggregateOutputType | null
    _max: PromoterMaxAggregateOutputType | null
  }

  type GetPromoterGroupByPayload<T extends PromoterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoterGroupByOutputType[P]>
            : GetScalarType<T[P], PromoterGroupByOutputType[P]>
        }
      >
    >


  export type PromoterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    region?: boolean
    genreFocus?: boolean
    instagram?: boolean
    facebook?: boolean
    website?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    festivals?: boolean | Promoter$festivalsArgs<ExtArgs>
    _count?: boolean | PromoterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoter"]>

  export type PromoterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    region?: boolean
    genreFocus?: boolean
    instagram?: boolean
    facebook?: boolean
    website?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["promoter"]>

  export type PromoterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    region?: boolean
    genreFocus?: boolean
    instagram?: boolean
    facebook?: boolean
    website?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["promoter"]>

  export type PromoterSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    region?: boolean
    genreFocus?: boolean
    instagram?: boolean
    facebook?: boolean
    website?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PromoterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "region" | "genreFocus" | "instagram" | "facebook" | "website" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["promoter"]>
  export type PromoterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festivals?: boolean | Promoter$festivalsArgs<ExtArgs>
    _count?: boolean | PromoterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PromoterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PromoterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PromoterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Promoter"
    objects: {
      festivals: Prisma.$FestivalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      region: string | null
      genreFocus: string | null
      instagram: string | null
      facebook: string | null
      website: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["promoter"]>
    composites: {}
  }

  type PromoterGetPayload<S extends boolean | null | undefined | PromoterDefaultArgs> = $Result.GetResult<Prisma.$PromoterPayload, S>

  type PromoterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromoterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromoterCountAggregateInputType | true
    }

  export interface PromoterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Promoter'], meta: { name: 'Promoter' } }
    /**
     * Find zero or one Promoter that matches the filter.
     * @param {PromoterFindUniqueArgs} args - Arguments to find a Promoter
     * @example
     * // Get one Promoter
     * const promoter = await prisma.promoter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoterFindUniqueArgs>(args: SelectSubset<T, PromoterFindUniqueArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Promoter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromoterFindUniqueOrThrowArgs} args - Arguments to find a Promoter
     * @example
     * // Get one Promoter
     * const promoter = await prisma.promoter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoterFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promoter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoterFindFirstArgs} args - Arguments to find a Promoter
     * @example
     * // Get one Promoter
     * const promoter = await prisma.promoter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoterFindFirstArgs>(args?: SelectSubset<T, PromoterFindFirstArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promoter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoterFindFirstOrThrowArgs} args - Arguments to find a Promoter
     * @example
     * // Get one Promoter
     * const promoter = await prisma.promoter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoterFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoterFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Promoters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promoters
     * const promoters = await prisma.promoter.findMany()
     * 
     * // Get first 10 Promoters
     * const promoters = await prisma.promoter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promoterWithIdOnly = await prisma.promoter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromoterFindManyArgs>(args?: SelectSubset<T, PromoterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Promoter.
     * @param {PromoterCreateArgs} args - Arguments to create a Promoter.
     * @example
     * // Create one Promoter
     * const Promoter = await prisma.promoter.create({
     *   data: {
     *     // ... data to create a Promoter
     *   }
     * })
     * 
     */
    create<T extends PromoterCreateArgs>(args: SelectSubset<T, PromoterCreateArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Promoters.
     * @param {PromoterCreateManyArgs} args - Arguments to create many Promoters.
     * @example
     * // Create many Promoters
     * const promoter = await prisma.promoter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoterCreateManyArgs>(args?: SelectSubset<T, PromoterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Promoters and returns the data saved in the database.
     * @param {PromoterCreateManyAndReturnArgs} args - Arguments to create many Promoters.
     * @example
     * // Create many Promoters
     * const promoter = await prisma.promoter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Promoters and only return the `id`
     * const promoterWithIdOnly = await prisma.promoter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromoterCreateManyAndReturnArgs>(args?: SelectSubset<T, PromoterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Promoter.
     * @param {PromoterDeleteArgs} args - Arguments to delete one Promoter.
     * @example
     * // Delete one Promoter
     * const Promoter = await prisma.promoter.delete({
     *   where: {
     *     // ... filter to delete one Promoter
     *   }
     * })
     * 
     */
    delete<T extends PromoterDeleteArgs>(args: SelectSubset<T, PromoterDeleteArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Promoter.
     * @param {PromoterUpdateArgs} args - Arguments to update one Promoter.
     * @example
     * // Update one Promoter
     * const promoter = await prisma.promoter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoterUpdateArgs>(args: SelectSubset<T, PromoterUpdateArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Promoters.
     * @param {PromoterDeleteManyArgs} args - Arguments to filter Promoters to delete.
     * @example
     * // Delete a few Promoters
     * const { count } = await prisma.promoter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoterDeleteManyArgs>(args?: SelectSubset<T, PromoterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promoters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promoters
     * const promoter = await prisma.promoter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoterUpdateManyArgs>(args: SelectSubset<T, PromoterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promoters and returns the data updated in the database.
     * @param {PromoterUpdateManyAndReturnArgs} args - Arguments to update many Promoters.
     * @example
     * // Update many Promoters
     * const promoter = await prisma.promoter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Promoters and only return the `id`
     * const promoterWithIdOnly = await prisma.promoter.updateManyAndReturn({
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
    updateManyAndReturn<T extends PromoterUpdateManyAndReturnArgs>(args: SelectSubset<T, PromoterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Promoter.
     * @param {PromoterUpsertArgs} args - Arguments to update or create a Promoter.
     * @example
     * // Update or create a Promoter
     * const promoter = await prisma.promoter.upsert({
     *   create: {
     *     // ... data to create a Promoter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promoter we want to update
     *   }
     * })
     */
    upsert<T extends PromoterUpsertArgs>(args: SelectSubset<T, PromoterUpsertArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Promoters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoterCountArgs} args - Arguments to filter Promoters to count.
     * @example
     * // Count the number of Promoters
     * const count = await prisma.promoter.count({
     *   where: {
     *     // ... the filter for the Promoters we want to count
     *   }
     * })
    **/
    count<T extends PromoterCountArgs>(
      args?: Subset<T, PromoterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promoter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PromoterAggregateArgs>(args: Subset<T, PromoterAggregateArgs>): Prisma.PrismaPromise<GetPromoterAggregateType<T>>

    /**
     * Group by Promoter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoterGroupByArgs} args - Group by arguments.
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
      T extends PromoterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoterGroupByArgs['orderBy'] }
        : { orderBy?: PromoterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PromoterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Promoter model
   */
  readonly fields: PromoterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Promoter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    festivals<T extends Promoter$festivalsArgs<ExtArgs> = {}>(args?: Subset<T, Promoter$festivalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Promoter model
   */
  interface PromoterFieldRefs {
    readonly id: FieldRef<"Promoter", 'String'>
    readonly name: FieldRef<"Promoter", 'String'>
    readonly slug: FieldRef<"Promoter", 'String'>
    readonly region: FieldRef<"Promoter", 'String'>
    readonly genreFocus: FieldRef<"Promoter", 'String'>
    readonly instagram: FieldRef<"Promoter", 'String'>
    readonly facebook: FieldRef<"Promoter", 'String'>
    readonly website: FieldRef<"Promoter", 'String'>
    readonly notes: FieldRef<"Promoter", 'String'>
    readonly createdAt: FieldRef<"Promoter", 'DateTime'>
    readonly updatedAt: FieldRef<"Promoter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Promoter findUnique
   */
  export type PromoterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * Filter, which Promoter to fetch.
     */
    where: PromoterWhereUniqueInput
  }

  /**
   * Promoter findUniqueOrThrow
   */
  export type PromoterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * Filter, which Promoter to fetch.
     */
    where: PromoterWhereUniqueInput
  }

  /**
   * Promoter findFirst
   */
  export type PromoterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * Filter, which Promoter to fetch.
     */
    where?: PromoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promoters to fetch.
     */
    orderBy?: PromoterOrderByWithRelationInput | PromoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promoters.
     */
    cursor?: PromoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promoters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promoters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promoters.
     */
    distinct?: PromoterScalarFieldEnum | PromoterScalarFieldEnum[]
  }

  /**
   * Promoter findFirstOrThrow
   */
  export type PromoterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * Filter, which Promoter to fetch.
     */
    where?: PromoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promoters to fetch.
     */
    orderBy?: PromoterOrderByWithRelationInput | PromoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promoters.
     */
    cursor?: PromoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promoters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promoters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promoters.
     */
    distinct?: PromoterScalarFieldEnum | PromoterScalarFieldEnum[]
  }

  /**
   * Promoter findMany
   */
  export type PromoterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * Filter, which Promoters to fetch.
     */
    where?: PromoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promoters to fetch.
     */
    orderBy?: PromoterOrderByWithRelationInput | PromoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Promoters.
     */
    cursor?: PromoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promoters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promoters.
     */
    skip?: number
    distinct?: PromoterScalarFieldEnum | PromoterScalarFieldEnum[]
  }

  /**
   * Promoter create
   */
  export type PromoterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * The data needed to create a Promoter.
     */
    data: XOR<PromoterCreateInput, PromoterUncheckedCreateInput>
  }

  /**
   * Promoter createMany
   */
  export type PromoterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Promoters.
     */
    data: PromoterCreateManyInput | PromoterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Promoter createManyAndReturn
   */
  export type PromoterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * The data used to create many Promoters.
     */
    data: PromoterCreateManyInput | PromoterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Promoter update
   */
  export type PromoterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * The data needed to update a Promoter.
     */
    data: XOR<PromoterUpdateInput, PromoterUncheckedUpdateInput>
    /**
     * Choose, which Promoter to update.
     */
    where: PromoterWhereUniqueInput
  }

  /**
   * Promoter updateMany
   */
  export type PromoterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Promoters.
     */
    data: XOR<PromoterUpdateManyMutationInput, PromoterUncheckedUpdateManyInput>
    /**
     * Filter which Promoters to update
     */
    where?: PromoterWhereInput
    /**
     * Limit how many Promoters to update.
     */
    limit?: number
  }

  /**
   * Promoter updateManyAndReturn
   */
  export type PromoterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * The data used to update Promoters.
     */
    data: XOR<PromoterUpdateManyMutationInput, PromoterUncheckedUpdateManyInput>
    /**
     * Filter which Promoters to update
     */
    where?: PromoterWhereInput
    /**
     * Limit how many Promoters to update.
     */
    limit?: number
  }

  /**
   * Promoter upsert
   */
  export type PromoterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * The filter to search for the Promoter to update in case it exists.
     */
    where: PromoterWhereUniqueInput
    /**
     * In case the Promoter found by the `where` argument doesn't exist, create a new Promoter with this data.
     */
    create: XOR<PromoterCreateInput, PromoterUncheckedCreateInput>
    /**
     * In case the Promoter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoterUpdateInput, PromoterUncheckedUpdateInput>
  }

  /**
   * Promoter delete
   */
  export type PromoterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    /**
     * Filter which Promoter to delete.
     */
    where: PromoterWhereUniqueInput
  }

  /**
   * Promoter deleteMany
   */
  export type PromoterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promoters to delete
     */
    where?: PromoterWhereInput
    /**
     * Limit how many Promoters to delete.
     */
    limit?: number
  }

  /**
   * Promoter.festivals
   */
  export type Promoter$festivalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    where?: FestivalWhereInput
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    cursor?: FestivalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Promoter without action
   */
  export type PromoterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
  }


  /**
   * Model Festival
   */

  export type AggregateFestival = {
    _count: FestivalCountAggregateOutputType | null
    _avg: FestivalAvgAggregateOutputType | null
    _sum: FestivalSumAggregateOutputType | null
    _min: FestivalMinAggregateOutputType | null
    _max: FestivalMaxAggregateOutputType | null
  }

  export type FestivalAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type FestivalSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type FestivalMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    status: $Enums.FestivalStatus | null
    region: $Enums.Region | null
    location: string | null
    genre: string | null
    costText: string | null
    dateText: string | null
    startDate: Date | null
    endDate: Date | null
    notes: string | null
    website: string | null
    approved: boolean | null
    vibe: string | null
    camping: boolean | null
    ticketPrice: string | null
    ticketUrl: string | null
    latitude: number | null
    longitude: number | null
    promoterId: string | null
    submittedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FestivalMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    status: $Enums.FestivalStatus | null
    region: $Enums.Region | null
    location: string | null
    genre: string | null
    costText: string | null
    dateText: string | null
    startDate: Date | null
    endDate: Date | null
    notes: string | null
    website: string | null
    approved: boolean | null
    vibe: string | null
    camping: boolean | null
    ticketPrice: string | null
    ticketUrl: string | null
    latitude: number | null
    longitude: number | null
    promoterId: string | null
    submittedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FestivalCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    status: number
    region: number
    location: number
    genre: number
    costText: number
    dateText: number
    startDate: number
    endDate: number
    notes: number
    website: number
    approved: number
    vibe: number
    camping: number
    ticketPrice: number
    ticketUrl: number
    latitude: number
    longitude: number
    promoterId: number
    submittedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FestivalAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type FestivalSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type FestivalMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    status?: true
    region?: true
    location?: true
    genre?: true
    costText?: true
    dateText?: true
    startDate?: true
    endDate?: true
    notes?: true
    website?: true
    approved?: true
    vibe?: true
    camping?: true
    ticketPrice?: true
    ticketUrl?: true
    latitude?: true
    longitude?: true
    promoterId?: true
    submittedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FestivalMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    status?: true
    region?: true
    location?: true
    genre?: true
    costText?: true
    dateText?: true
    startDate?: true
    endDate?: true
    notes?: true
    website?: true
    approved?: true
    vibe?: true
    camping?: true
    ticketPrice?: true
    ticketUrl?: true
    latitude?: true
    longitude?: true
    promoterId?: true
    submittedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FestivalCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    status?: true
    region?: true
    location?: true
    genre?: true
    costText?: true
    dateText?: true
    startDate?: true
    endDate?: true
    notes?: true
    website?: true
    approved?: true
    vibe?: true
    camping?: true
    ticketPrice?: true
    ticketUrl?: true
    latitude?: true
    longitude?: true
    promoterId?: true
    submittedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FestivalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festival to aggregate.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Festivals
    **/
    _count?: true | FestivalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FestivalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FestivalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FestivalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FestivalMaxAggregateInputType
  }

  export type GetFestivalAggregateType<T extends FestivalAggregateArgs> = {
        [P in keyof T & keyof AggregateFestival]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFestival[P]>
      : GetScalarType<T[P], AggregateFestival[P]>
  }




  export type FestivalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestivalWhereInput
    orderBy?: FestivalOrderByWithAggregationInput | FestivalOrderByWithAggregationInput[]
    by: FestivalScalarFieldEnum[] | FestivalScalarFieldEnum
    having?: FestivalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FestivalCountAggregateInputType | true
    _avg?: FestivalAvgAggregateInputType
    _sum?: FestivalSumAggregateInputType
    _min?: FestivalMinAggregateInputType
    _max?: FestivalMaxAggregateInputType
  }

  export type FestivalGroupByOutputType = {
    id: string
    name: string
    slug: string
    status: $Enums.FestivalStatus
    region: $Enums.Region | null
    location: string | null
    genre: string | null
    costText: string | null
    dateText: string | null
    startDate: Date | null
    endDate: Date | null
    notes: string | null
    website: string | null
    approved: boolean
    vibe: string | null
    camping: boolean | null
    ticketPrice: string | null
    ticketUrl: string | null
    latitude: number | null
    longitude: number | null
    promoterId: string | null
    submittedById: string | null
    createdAt: Date
    updatedAt: Date
    _count: FestivalCountAggregateOutputType | null
    _avg: FestivalAvgAggregateOutputType | null
    _sum: FestivalSumAggregateOutputType | null
    _min: FestivalMinAggregateOutputType | null
    _max: FestivalMaxAggregateOutputType | null
  }

  type GetFestivalGroupByPayload<T extends FestivalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FestivalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FestivalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FestivalGroupByOutputType[P]>
            : GetScalarType<T[P], FestivalGroupByOutputType[P]>
        }
      >
    >


  export type FestivalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    region?: boolean
    location?: boolean
    genre?: boolean
    costText?: boolean
    dateText?: boolean
    startDate?: boolean
    endDate?: boolean
    notes?: boolean
    website?: boolean
    approved?: boolean
    vibe?: boolean
    camping?: boolean
    ticketPrice?: boolean
    ticketUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    promoterId?: boolean
    submittedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoter?: boolean | Festival$promoterArgs<ExtArgs>
    submittedBy?: boolean | Festival$submittedByArgs<ExtArgs>
    lineups?: boolean | Festival$lineupsArgs<ExtArgs>
    _count?: boolean | FestivalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["festival"]>

  export type FestivalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    region?: boolean
    location?: boolean
    genre?: boolean
    costText?: boolean
    dateText?: boolean
    startDate?: boolean
    endDate?: boolean
    notes?: boolean
    website?: boolean
    approved?: boolean
    vibe?: boolean
    camping?: boolean
    ticketPrice?: boolean
    ticketUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    promoterId?: boolean
    submittedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoter?: boolean | Festival$promoterArgs<ExtArgs>
    submittedBy?: boolean | Festival$submittedByArgs<ExtArgs>
  }, ExtArgs["result"]["festival"]>

  export type FestivalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    region?: boolean
    location?: boolean
    genre?: boolean
    costText?: boolean
    dateText?: boolean
    startDate?: boolean
    endDate?: boolean
    notes?: boolean
    website?: boolean
    approved?: boolean
    vibe?: boolean
    camping?: boolean
    ticketPrice?: boolean
    ticketUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    promoterId?: boolean
    submittedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoter?: boolean | Festival$promoterArgs<ExtArgs>
    submittedBy?: boolean | Festival$submittedByArgs<ExtArgs>
  }, ExtArgs["result"]["festival"]>

  export type FestivalSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    region?: boolean
    location?: boolean
    genre?: boolean
    costText?: boolean
    dateText?: boolean
    startDate?: boolean
    endDate?: boolean
    notes?: boolean
    website?: boolean
    approved?: boolean
    vibe?: boolean
    camping?: boolean
    ticketPrice?: boolean
    ticketUrl?: boolean
    latitude?: boolean
    longitude?: boolean
    promoterId?: boolean
    submittedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FestivalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "status" | "region" | "location" | "genre" | "costText" | "dateText" | "startDate" | "endDate" | "notes" | "website" | "approved" | "vibe" | "camping" | "ticketPrice" | "ticketUrl" | "latitude" | "longitude" | "promoterId" | "submittedById" | "createdAt" | "updatedAt", ExtArgs["result"]["festival"]>
  export type FestivalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoter?: boolean | Festival$promoterArgs<ExtArgs>
    submittedBy?: boolean | Festival$submittedByArgs<ExtArgs>
    lineups?: boolean | Festival$lineupsArgs<ExtArgs>
    _count?: boolean | FestivalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FestivalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoter?: boolean | Festival$promoterArgs<ExtArgs>
    submittedBy?: boolean | Festival$submittedByArgs<ExtArgs>
  }
  export type FestivalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoter?: boolean | Festival$promoterArgs<ExtArgs>
    submittedBy?: boolean | Festival$submittedByArgs<ExtArgs>
  }

  export type $FestivalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Festival"
    objects: {
      promoter: Prisma.$PromoterPayload<ExtArgs> | null
      submittedBy: Prisma.$UserPayload<ExtArgs> | null
      lineups: Prisma.$LineupEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      status: $Enums.FestivalStatus
      region: $Enums.Region | null
      location: string | null
      genre: string | null
      costText: string | null
      dateText: string | null
      startDate: Date | null
      endDate: Date | null
      notes: string | null
      website: string | null
      approved: boolean
      vibe: string | null
      camping: boolean | null
      ticketPrice: string | null
      ticketUrl: string | null
      latitude: number | null
      longitude: number | null
      promoterId: string | null
      submittedById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["festival"]>
    composites: {}
  }

  type FestivalGetPayload<S extends boolean | null | undefined | FestivalDefaultArgs> = $Result.GetResult<Prisma.$FestivalPayload, S>

  type FestivalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FestivalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FestivalCountAggregateInputType | true
    }

  export interface FestivalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Festival'], meta: { name: 'Festival' } }
    /**
     * Find zero or one Festival that matches the filter.
     * @param {FestivalFindUniqueArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FestivalFindUniqueArgs>(args: SelectSubset<T, FestivalFindUniqueArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Festival that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FestivalFindUniqueOrThrowArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FestivalFindUniqueOrThrowArgs>(args: SelectSubset<T, FestivalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festival that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindFirstArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FestivalFindFirstArgs>(args?: SelectSubset<T, FestivalFindFirstArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festival that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindFirstOrThrowArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FestivalFindFirstOrThrowArgs>(args?: SelectSubset<T, FestivalFindFirstOrThrowArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Festivals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Festivals
     * const festivals = await prisma.festival.findMany()
     * 
     * // Get first 10 Festivals
     * const festivals = await prisma.festival.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const festivalWithIdOnly = await prisma.festival.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FestivalFindManyArgs>(args?: SelectSubset<T, FestivalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Festival.
     * @param {FestivalCreateArgs} args - Arguments to create a Festival.
     * @example
     * // Create one Festival
     * const Festival = await prisma.festival.create({
     *   data: {
     *     // ... data to create a Festival
     *   }
     * })
     * 
     */
    create<T extends FestivalCreateArgs>(args: SelectSubset<T, FestivalCreateArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Festivals.
     * @param {FestivalCreateManyArgs} args - Arguments to create many Festivals.
     * @example
     * // Create many Festivals
     * const festival = await prisma.festival.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FestivalCreateManyArgs>(args?: SelectSubset<T, FestivalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Festivals and returns the data saved in the database.
     * @param {FestivalCreateManyAndReturnArgs} args - Arguments to create many Festivals.
     * @example
     * // Create many Festivals
     * const festival = await prisma.festival.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Festivals and only return the `id`
     * const festivalWithIdOnly = await prisma.festival.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FestivalCreateManyAndReturnArgs>(args?: SelectSubset<T, FestivalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Festival.
     * @param {FestivalDeleteArgs} args - Arguments to delete one Festival.
     * @example
     * // Delete one Festival
     * const Festival = await prisma.festival.delete({
     *   where: {
     *     // ... filter to delete one Festival
     *   }
     * })
     * 
     */
    delete<T extends FestivalDeleteArgs>(args: SelectSubset<T, FestivalDeleteArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Festival.
     * @param {FestivalUpdateArgs} args - Arguments to update one Festival.
     * @example
     * // Update one Festival
     * const festival = await prisma.festival.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FestivalUpdateArgs>(args: SelectSubset<T, FestivalUpdateArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Festivals.
     * @param {FestivalDeleteManyArgs} args - Arguments to filter Festivals to delete.
     * @example
     * // Delete a few Festivals
     * const { count } = await prisma.festival.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FestivalDeleteManyArgs>(args?: SelectSubset<T, FestivalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Festivals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Festivals
     * const festival = await prisma.festival.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FestivalUpdateManyArgs>(args: SelectSubset<T, FestivalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Festivals and returns the data updated in the database.
     * @param {FestivalUpdateManyAndReturnArgs} args - Arguments to update many Festivals.
     * @example
     * // Update many Festivals
     * const festival = await prisma.festival.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Festivals and only return the `id`
     * const festivalWithIdOnly = await prisma.festival.updateManyAndReturn({
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
    updateManyAndReturn<T extends FestivalUpdateManyAndReturnArgs>(args: SelectSubset<T, FestivalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Festival.
     * @param {FestivalUpsertArgs} args - Arguments to update or create a Festival.
     * @example
     * // Update or create a Festival
     * const festival = await prisma.festival.upsert({
     *   create: {
     *     // ... data to create a Festival
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Festival we want to update
     *   }
     * })
     */
    upsert<T extends FestivalUpsertArgs>(args: SelectSubset<T, FestivalUpsertArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Festivals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalCountArgs} args - Arguments to filter Festivals to count.
     * @example
     * // Count the number of Festivals
     * const count = await prisma.festival.count({
     *   where: {
     *     // ... the filter for the Festivals we want to count
     *   }
     * })
    **/
    count<T extends FestivalCountArgs>(
      args?: Subset<T, FestivalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FestivalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Festival.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FestivalAggregateArgs>(args: Subset<T, FestivalAggregateArgs>): Prisma.PrismaPromise<GetFestivalAggregateType<T>>

    /**
     * Group by Festival.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalGroupByArgs} args - Group by arguments.
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
      T extends FestivalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FestivalGroupByArgs['orderBy'] }
        : { orderBy?: FestivalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FestivalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFestivalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Festival model
   */
  readonly fields: FestivalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Festival.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FestivalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    promoter<T extends Festival$promoterArgs<ExtArgs> = {}>(args?: Subset<T, Festival$promoterArgs<ExtArgs>>): Prisma__PromoterClient<$Result.GetResult<Prisma.$PromoterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    submittedBy<T extends Festival$submittedByArgs<ExtArgs> = {}>(args?: Subset<T, Festival$submittedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    lineups<T extends Festival$lineupsArgs<ExtArgs> = {}>(args?: Subset<T, Festival$lineupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Festival model
   */
  interface FestivalFieldRefs {
    readonly id: FieldRef<"Festival", 'String'>
    readonly name: FieldRef<"Festival", 'String'>
    readonly slug: FieldRef<"Festival", 'String'>
    readonly status: FieldRef<"Festival", 'FestivalStatus'>
    readonly region: FieldRef<"Festival", 'Region'>
    readonly location: FieldRef<"Festival", 'String'>
    readonly genre: FieldRef<"Festival", 'String'>
    readonly costText: FieldRef<"Festival", 'String'>
    readonly dateText: FieldRef<"Festival", 'String'>
    readonly startDate: FieldRef<"Festival", 'DateTime'>
    readonly endDate: FieldRef<"Festival", 'DateTime'>
    readonly notes: FieldRef<"Festival", 'String'>
    readonly website: FieldRef<"Festival", 'String'>
    readonly approved: FieldRef<"Festival", 'Boolean'>
    readonly vibe: FieldRef<"Festival", 'String'>
    readonly camping: FieldRef<"Festival", 'Boolean'>
    readonly ticketPrice: FieldRef<"Festival", 'String'>
    readonly ticketUrl: FieldRef<"Festival", 'String'>
    readonly latitude: FieldRef<"Festival", 'Float'>
    readonly longitude: FieldRef<"Festival", 'Float'>
    readonly promoterId: FieldRef<"Festival", 'String'>
    readonly submittedById: FieldRef<"Festival", 'String'>
    readonly createdAt: FieldRef<"Festival", 'DateTime'>
    readonly updatedAt: FieldRef<"Festival", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Festival findUnique
   */
  export type FestivalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival findUniqueOrThrow
   */
  export type FestivalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival findFirst
   */
  export type FestivalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festivals.
     */
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival findFirstOrThrow
   */
  export type FestivalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festivals.
     */
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival findMany
   */
  export type FestivalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festivals to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival create
   */
  export type FestivalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The data needed to create a Festival.
     */
    data: XOR<FestivalCreateInput, FestivalUncheckedCreateInput>
  }

  /**
   * Festival createMany
   */
  export type FestivalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Festivals.
     */
    data: FestivalCreateManyInput | FestivalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Festival createManyAndReturn
   */
  export type FestivalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * The data used to create many Festivals.
     */
    data: FestivalCreateManyInput | FestivalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Festival update
   */
  export type FestivalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The data needed to update a Festival.
     */
    data: XOR<FestivalUpdateInput, FestivalUncheckedUpdateInput>
    /**
     * Choose, which Festival to update.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival updateMany
   */
  export type FestivalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Festivals.
     */
    data: XOR<FestivalUpdateManyMutationInput, FestivalUncheckedUpdateManyInput>
    /**
     * Filter which Festivals to update
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to update.
     */
    limit?: number
  }

  /**
   * Festival updateManyAndReturn
   */
  export type FestivalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * The data used to update Festivals.
     */
    data: XOR<FestivalUpdateManyMutationInput, FestivalUncheckedUpdateManyInput>
    /**
     * Filter which Festivals to update
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Festival upsert
   */
  export type FestivalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The filter to search for the Festival to update in case it exists.
     */
    where: FestivalWhereUniqueInput
    /**
     * In case the Festival found by the `where` argument doesn't exist, create a new Festival with this data.
     */
    create: XOR<FestivalCreateInput, FestivalUncheckedCreateInput>
    /**
     * In case the Festival was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FestivalUpdateInput, FestivalUncheckedUpdateInput>
  }

  /**
   * Festival delete
   */
  export type FestivalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter which Festival to delete.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival deleteMany
   */
  export type FestivalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festivals to delete
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to delete.
     */
    limit?: number
  }

  /**
   * Festival.promoter
   */
  export type Festival$promoterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promoter
     */
    select?: PromoterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promoter
     */
    omit?: PromoterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoterInclude<ExtArgs> | null
    where?: PromoterWhereInput
  }

  /**
   * Festival.submittedBy
   */
  export type Festival$submittedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Festival.lineups
   */
  export type Festival$lineupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    where?: LineupEntryWhereInput
    orderBy?: LineupEntryOrderByWithRelationInput | LineupEntryOrderByWithRelationInput[]
    cursor?: LineupEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LineupEntryScalarFieldEnum | LineupEntryScalarFieldEnum[]
  }

  /**
   * Festival without action
   */
  export type FestivalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
  }


  /**
   * Model Artist
   */

  export type AggregateArtist = {
    _count: ArtistCountAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  export type ArtistMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    genre: string | null
    homeCity: string | null
    crew: string | null
    instagram: string | null
    soundcloud: string | null
    raUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtistMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    genre: string | null
    homeCity: string | null
    crew: string | null
    instagram: string | null
    soundcloud: string | null
    raUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtistCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    genre: number
    homeCity: number
    crew: number
    instagram: number
    soundcloud: number
    raUrl: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArtistMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    genre?: true
    homeCity?: true
    crew?: true
    instagram?: true
    soundcloud?: true
    raUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtistMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    genre?: true
    homeCity?: true
    crew?: true
    instagram?: true
    soundcloud?: true
    raUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtistCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    genre?: true
    homeCity?: true
    crew?: true
    instagram?: true
    soundcloud?: true
    raUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArtistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artist to aggregate.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Artists
    **/
    _count?: true | ArtistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtistMaxAggregateInputType
  }

  export type GetArtistAggregateType<T extends ArtistAggregateArgs> = {
        [P in keyof T & keyof AggregateArtist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtist[P]>
      : GetScalarType<T[P], AggregateArtist[P]>
  }




  export type ArtistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtistWhereInput
    orderBy?: ArtistOrderByWithAggregationInput | ArtistOrderByWithAggregationInput[]
    by: ArtistScalarFieldEnum[] | ArtistScalarFieldEnum
    having?: ArtistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtistCountAggregateInputType | true
    _min?: ArtistMinAggregateInputType
    _max?: ArtistMaxAggregateInputType
  }

  export type ArtistGroupByOutputType = {
    id: string
    name: string
    slug: string
    genre: string | null
    homeCity: string | null
    crew: string | null
    instagram: string | null
    soundcloud: string | null
    raUrl: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: ArtistCountAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  type GetArtistGroupByPayload<T extends ArtistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtistGroupByOutputType[P]>
            : GetScalarType<T[P], ArtistGroupByOutputType[P]>
        }
      >
    >


  export type ArtistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    genre?: boolean
    homeCity?: boolean
    crew?: boolean
    instagram?: boolean
    soundcloud?: boolean
    raUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lineups?: boolean | Artist$lineupsArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artist"]>

  export type ArtistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    genre?: boolean
    homeCity?: boolean
    crew?: boolean
    instagram?: boolean
    soundcloud?: boolean
    raUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["artist"]>

  export type ArtistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    genre?: boolean
    homeCity?: boolean
    crew?: boolean
    instagram?: boolean
    soundcloud?: boolean
    raUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["artist"]>

  export type ArtistSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    genre?: boolean
    homeCity?: boolean
    crew?: boolean
    instagram?: boolean
    soundcloud?: boolean
    raUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArtistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "genre" | "homeCity" | "crew" | "instagram" | "soundcloud" | "raUrl" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["artist"]>
  export type ArtistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineups?: boolean | Artist$lineupsArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArtistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ArtistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArtistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Artist"
    objects: {
      lineups: Prisma.$LineupEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      genre: string | null
      homeCity: string | null
      crew: string | null
      instagram: string | null
      soundcloud: string | null
      raUrl: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["artist"]>
    composites: {}
  }

  type ArtistGetPayload<S extends boolean | null | undefined | ArtistDefaultArgs> = $Result.GetResult<Prisma.$ArtistPayload, S>

  type ArtistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtistCountAggregateInputType | true
    }

  export interface ArtistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Artist'], meta: { name: 'Artist' } }
    /**
     * Find zero or one Artist that matches the filter.
     * @param {ArtistFindUniqueArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtistFindUniqueArgs>(args: SelectSubset<T, ArtistFindUniqueArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Artist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtistFindUniqueOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtistFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindFirstArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtistFindFirstArgs>(args?: SelectSubset<T, ArtistFindFirstArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindFirstOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtistFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtistFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Artists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Artists
     * const artists = await prisma.artist.findMany()
     * 
     * // Get first 10 Artists
     * const artists = await prisma.artist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artistWithIdOnly = await prisma.artist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtistFindManyArgs>(args?: SelectSubset<T, ArtistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Artist.
     * @param {ArtistCreateArgs} args - Arguments to create a Artist.
     * @example
     * // Create one Artist
     * const Artist = await prisma.artist.create({
     *   data: {
     *     // ... data to create a Artist
     *   }
     * })
     * 
     */
    create<T extends ArtistCreateArgs>(args: SelectSubset<T, ArtistCreateArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Artists.
     * @param {ArtistCreateManyArgs} args - Arguments to create many Artists.
     * @example
     * // Create many Artists
     * const artist = await prisma.artist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtistCreateManyArgs>(args?: SelectSubset<T, ArtistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Artists and returns the data saved in the database.
     * @param {ArtistCreateManyAndReturnArgs} args - Arguments to create many Artists.
     * @example
     * // Create many Artists
     * const artist = await prisma.artist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Artists and only return the `id`
     * const artistWithIdOnly = await prisma.artist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtistCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Artist.
     * @param {ArtistDeleteArgs} args - Arguments to delete one Artist.
     * @example
     * // Delete one Artist
     * const Artist = await prisma.artist.delete({
     *   where: {
     *     // ... filter to delete one Artist
     *   }
     * })
     * 
     */
    delete<T extends ArtistDeleteArgs>(args: SelectSubset<T, ArtistDeleteArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Artist.
     * @param {ArtistUpdateArgs} args - Arguments to update one Artist.
     * @example
     * // Update one Artist
     * const artist = await prisma.artist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtistUpdateArgs>(args: SelectSubset<T, ArtistUpdateArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Artists.
     * @param {ArtistDeleteManyArgs} args - Arguments to filter Artists to delete.
     * @example
     * // Delete a few Artists
     * const { count } = await prisma.artist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtistDeleteManyArgs>(args?: SelectSubset<T, ArtistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Artists
     * const artist = await prisma.artist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtistUpdateManyArgs>(args: SelectSubset<T, ArtistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artists and returns the data updated in the database.
     * @param {ArtistUpdateManyAndReturnArgs} args - Arguments to update many Artists.
     * @example
     * // Update many Artists
     * const artist = await prisma.artist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Artists and only return the `id`
     * const artistWithIdOnly = await prisma.artist.updateManyAndReturn({
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
    updateManyAndReturn<T extends ArtistUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Artist.
     * @param {ArtistUpsertArgs} args - Arguments to update or create a Artist.
     * @example
     * // Update or create a Artist
     * const artist = await prisma.artist.upsert({
     *   create: {
     *     // ... data to create a Artist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Artist we want to update
     *   }
     * })
     */
    upsert<T extends ArtistUpsertArgs>(args: SelectSubset<T, ArtistUpsertArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCountArgs} args - Arguments to filter Artists to count.
     * @example
     * // Count the number of Artists
     * const count = await prisma.artist.count({
     *   where: {
     *     // ... the filter for the Artists we want to count
     *   }
     * })
    **/
    count<T extends ArtistCountArgs>(
      args?: Subset<T, ArtistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArtistAggregateArgs>(args: Subset<T, ArtistAggregateArgs>): Prisma.PrismaPromise<GetArtistAggregateType<T>>

    /**
     * Group by Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistGroupByArgs} args - Group by arguments.
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
      T extends ArtistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtistGroupByArgs['orderBy'] }
        : { orderBy?: ArtistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArtistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Artist model
   */
  readonly fields: ArtistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Artist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lineups<T extends Artist$lineupsArgs<ExtArgs> = {}>(args?: Subset<T, Artist$lineupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Artist model
   */
  interface ArtistFieldRefs {
    readonly id: FieldRef<"Artist", 'String'>
    readonly name: FieldRef<"Artist", 'String'>
    readonly slug: FieldRef<"Artist", 'String'>
    readonly genre: FieldRef<"Artist", 'String'>
    readonly homeCity: FieldRef<"Artist", 'String'>
    readonly crew: FieldRef<"Artist", 'String'>
    readonly instagram: FieldRef<"Artist", 'String'>
    readonly soundcloud: FieldRef<"Artist", 'String'>
    readonly raUrl: FieldRef<"Artist", 'String'>
    readonly notes: FieldRef<"Artist", 'String'>
    readonly createdAt: FieldRef<"Artist", 'DateTime'>
    readonly updatedAt: FieldRef<"Artist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Artist findUnique
   */
  export type ArtistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist findUniqueOrThrow
   */
  export type ArtistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist findFirst
   */
  export type ArtistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * Artist findFirstOrThrow
   */
  export type ArtistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * Artist findMany
   */
  export type ArtistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artists to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * Artist create
   */
  export type ArtistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The data needed to create a Artist.
     */
    data: XOR<ArtistCreateInput, ArtistUncheckedCreateInput>
  }

  /**
   * Artist createMany
   */
  export type ArtistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Artists.
     */
    data: ArtistCreateManyInput | ArtistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artist createManyAndReturn
   */
  export type ArtistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * The data used to create many Artists.
     */
    data: ArtistCreateManyInput | ArtistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artist update
   */
  export type ArtistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The data needed to update a Artist.
     */
    data: XOR<ArtistUpdateInput, ArtistUncheckedUpdateInput>
    /**
     * Choose, which Artist to update.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist updateMany
   */
  export type ArtistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Artists.
     */
    data: XOR<ArtistUpdateManyMutationInput, ArtistUncheckedUpdateManyInput>
    /**
     * Filter which Artists to update
     */
    where?: ArtistWhereInput
    /**
     * Limit how many Artists to update.
     */
    limit?: number
  }

  /**
   * Artist updateManyAndReturn
   */
  export type ArtistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * The data used to update Artists.
     */
    data: XOR<ArtistUpdateManyMutationInput, ArtistUncheckedUpdateManyInput>
    /**
     * Filter which Artists to update
     */
    where?: ArtistWhereInput
    /**
     * Limit how many Artists to update.
     */
    limit?: number
  }

  /**
   * Artist upsert
   */
  export type ArtistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The filter to search for the Artist to update in case it exists.
     */
    where: ArtistWhereUniqueInput
    /**
     * In case the Artist found by the `where` argument doesn't exist, create a new Artist with this data.
     */
    create: XOR<ArtistCreateInput, ArtistUncheckedCreateInput>
    /**
     * In case the Artist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtistUpdateInput, ArtistUncheckedUpdateInput>
  }

  /**
   * Artist delete
   */
  export type ArtistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter which Artist to delete.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist deleteMany
   */
  export type ArtistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artists to delete
     */
    where?: ArtistWhereInput
    /**
     * Limit how many Artists to delete.
     */
    limit?: number
  }

  /**
   * Artist.lineups
   */
  export type Artist$lineupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    where?: LineupEntryWhereInput
    orderBy?: LineupEntryOrderByWithRelationInput | LineupEntryOrderByWithRelationInput[]
    cursor?: LineupEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LineupEntryScalarFieldEnum | LineupEntryScalarFieldEnum[]
  }

  /**
   * Artist without action
   */
  export type ArtistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
  }


  /**
   * Model LineupEntry
   */

  export type AggregateLineupEntry = {
    _count: LineupEntryCountAggregateOutputType | null
    _avg: LineupEntryAvgAggregateOutputType | null
    _sum: LineupEntrySumAggregateOutputType | null
    _min: LineupEntryMinAggregateOutputType | null
    _max: LineupEntryMaxAggregateOutputType | null
  }

  export type LineupEntryAvgAggregateOutputType = {
    year: number | null
  }

  export type LineupEntrySumAggregateOutputType = {
    year: number | null
  }

  export type LineupEntryMinAggregateOutputType = {
    id: string | null
    festivalId: string | null
    artistId: string | null
    year: number | null
    isHeadliner: boolean | null
    source: string | null
    createdAt: Date | null
  }

  export type LineupEntryMaxAggregateOutputType = {
    id: string | null
    festivalId: string | null
    artistId: string | null
    year: number | null
    isHeadliner: boolean | null
    source: string | null
    createdAt: Date | null
  }

  export type LineupEntryCountAggregateOutputType = {
    id: number
    festivalId: number
    artistId: number
    year: number
    isHeadliner: number
    source: number
    createdAt: number
    _all: number
  }


  export type LineupEntryAvgAggregateInputType = {
    year?: true
  }

  export type LineupEntrySumAggregateInputType = {
    year?: true
  }

  export type LineupEntryMinAggregateInputType = {
    id?: true
    festivalId?: true
    artistId?: true
    year?: true
    isHeadliner?: true
    source?: true
    createdAt?: true
  }

  export type LineupEntryMaxAggregateInputType = {
    id?: true
    festivalId?: true
    artistId?: true
    year?: true
    isHeadliner?: true
    source?: true
    createdAt?: true
  }

  export type LineupEntryCountAggregateInputType = {
    id?: true
    festivalId?: true
    artistId?: true
    year?: true
    isHeadliner?: true
    source?: true
    createdAt?: true
    _all?: true
  }

  export type LineupEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LineupEntry to aggregate.
     */
    where?: LineupEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineupEntries to fetch.
     */
    orderBy?: LineupEntryOrderByWithRelationInput | LineupEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LineupEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineupEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineupEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LineupEntries
    **/
    _count?: true | LineupEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LineupEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LineupEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LineupEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LineupEntryMaxAggregateInputType
  }

  export type GetLineupEntryAggregateType<T extends LineupEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLineupEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLineupEntry[P]>
      : GetScalarType<T[P], AggregateLineupEntry[P]>
  }




  export type LineupEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LineupEntryWhereInput
    orderBy?: LineupEntryOrderByWithAggregationInput | LineupEntryOrderByWithAggregationInput[]
    by: LineupEntryScalarFieldEnum[] | LineupEntryScalarFieldEnum
    having?: LineupEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LineupEntryCountAggregateInputType | true
    _avg?: LineupEntryAvgAggregateInputType
    _sum?: LineupEntrySumAggregateInputType
    _min?: LineupEntryMinAggregateInputType
    _max?: LineupEntryMaxAggregateInputType
  }

  export type LineupEntryGroupByOutputType = {
    id: string
    festivalId: string
    artistId: string
    year: number
    isHeadliner: boolean
    source: string | null
    createdAt: Date
    _count: LineupEntryCountAggregateOutputType | null
    _avg: LineupEntryAvgAggregateOutputType | null
    _sum: LineupEntrySumAggregateOutputType | null
    _min: LineupEntryMinAggregateOutputType | null
    _max: LineupEntryMaxAggregateOutputType | null
  }

  type GetLineupEntryGroupByPayload<T extends LineupEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LineupEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LineupEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LineupEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LineupEntryGroupByOutputType[P]>
        }
      >
    >


  export type LineupEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    artistId?: boolean
    year?: boolean
    isHeadliner?: boolean
    source?: boolean
    createdAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineupEntry"]>

  export type LineupEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    artistId?: boolean
    year?: boolean
    isHeadliner?: boolean
    source?: boolean
    createdAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineupEntry"]>

  export type LineupEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    artistId?: boolean
    year?: boolean
    isHeadliner?: boolean
    source?: boolean
    createdAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineupEntry"]>

  export type LineupEntrySelectScalar = {
    id?: boolean
    festivalId?: boolean
    artistId?: boolean
    year?: boolean
    isHeadliner?: boolean
    source?: boolean
    createdAt?: boolean
  }

  export type LineupEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "festivalId" | "artistId" | "year" | "isHeadliner" | "source" | "createdAt", ExtArgs["result"]["lineupEntry"]>
  export type LineupEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }
  export type LineupEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }
  export type LineupEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }

  export type $LineupEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LineupEntry"
    objects: {
      festival: Prisma.$FestivalPayload<ExtArgs>
      artist: Prisma.$ArtistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      festivalId: string
      artistId: string
      year: number
      isHeadliner: boolean
      source: string | null
      createdAt: Date
    }, ExtArgs["result"]["lineupEntry"]>
    composites: {}
  }

  type LineupEntryGetPayload<S extends boolean | null | undefined | LineupEntryDefaultArgs> = $Result.GetResult<Prisma.$LineupEntryPayload, S>

  type LineupEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LineupEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LineupEntryCountAggregateInputType | true
    }

  export interface LineupEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LineupEntry'], meta: { name: 'LineupEntry' } }
    /**
     * Find zero or one LineupEntry that matches the filter.
     * @param {LineupEntryFindUniqueArgs} args - Arguments to find a LineupEntry
     * @example
     * // Get one LineupEntry
     * const lineupEntry = await prisma.lineupEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LineupEntryFindUniqueArgs>(args: SelectSubset<T, LineupEntryFindUniqueArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LineupEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LineupEntryFindUniqueOrThrowArgs} args - Arguments to find a LineupEntry
     * @example
     * // Get one LineupEntry
     * const lineupEntry = await prisma.lineupEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LineupEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, LineupEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LineupEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineupEntryFindFirstArgs} args - Arguments to find a LineupEntry
     * @example
     * // Get one LineupEntry
     * const lineupEntry = await prisma.lineupEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LineupEntryFindFirstArgs>(args?: SelectSubset<T, LineupEntryFindFirstArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LineupEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineupEntryFindFirstOrThrowArgs} args - Arguments to find a LineupEntry
     * @example
     * // Get one LineupEntry
     * const lineupEntry = await prisma.lineupEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LineupEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, LineupEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LineupEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineupEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LineupEntries
     * const lineupEntries = await prisma.lineupEntry.findMany()
     * 
     * // Get first 10 LineupEntries
     * const lineupEntries = await prisma.lineupEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lineupEntryWithIdOnly = await prisma.lineupEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LineupEntryFindManyArgs>(args?: SelectSubset<T, LineupEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LineupEntry.
     * @param {LineupEntryCreateArgs} args - Arguments to create a LineupEntry.
     * @example
     * // Create one LineupEntry
     * const LineupEntry = await prisma.lineupEntry.create({
     *   data: {
     *     // ... data to create a LineupEntry
     *   }
     * })
     * 
     */
    create<T extends LineupEntryCreateArgs>(args: SelectSubset<T, LineupEntryCreateArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LineupEntries.
     * @param {LineupEntryCreateManyArgs} args - Arguments to create many LineupEntries.
     * @example
     * // Create many LineupEntries
     * const lineupEntry = await prisma.lineupEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LineupEntryCreateManyArgs>(args?: SelectSubset<T, LineupEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LineupEntries and returns the data saved in the database.
     * @param {LineupEntryCreateManyAndReturnArgs} args - Arguments to create many LineupEntries.
     * @example
     * // Create many LineupEntries
     * const lineupEntry = await prisma.lineupEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LineupEntries and only return the `id`
     * const lineupEntryWithIdOnly = await prisma.lineupEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LineupEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, LineupEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LineupEntry.
     * @param {LineupEntryDeleteArgs} args - Arguments to delete one LineupEntry.
     * @example
     * // Delete one LineupEntry
     * const LineupEntry = await prisma.lineupEntry.delete({
     *   where: {
     *     // ... filter to delete one LineupEntry
     *   }
     * })
     * 
     */
    delete<T extends LineupEntryDeleteArgs>(args: SelectSubset<T, LineupEntryDeleteArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LineupEntry.
     * @param {LineupEntryUpdateArgs} args - Arguments to update one LineupEntry.
     * @example
     * // Update one LineupEntry
     * const lineupEntry = await prisma.lineupEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LineupEntryUpdateArgs>(args: SelectSubset<T, LineupEntryUpdateArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LineupEntries.
     * @param {LineupEntryDeleteManyArgs} args - Arguments to filter LineupEntries to delete.
     * @example
     * // Delete a few LineupEntries
     * const { count } = await prisma.lineupEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LineupEntryDeleteManyArgs>(args?: SelectSubset<T, LineupEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LineupEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineupEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LineupEntries
     * const lineupEntry = await prisma.lineupEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LineupEntryUpdateManyArgs>(args: SelectSubset<T, LineupEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LineupEntries and returns the data updated in the database.
     * @param {LineupEntryUpdateManyAndReturnArgs} args - Arguments to update many LineupEntries.
     * @example
     * // Update many LineupEntries
     * const lineupEntry = await prisma.lineupEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LineupEntries and only return the `id`
     * const lineupEntryWithIdOnly = await prisma.lineupEntry.updateManyAndReturn({
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
    updateManyAndReturn<T extends LineupEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, LineupEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LineupEntry.
     * @param {LineupEntryUpsertArgs} args - Arguments to update or create a LineupEntry.
     * @example
     * // Update or create a LineupEntry
     * const lineupEntry = await prisma.lineupEntry.upsert({
     *   create: {
     *     // ... data to create a LineupEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LineupEntry we want to update
     *   }
     * })
     */
    upsert<T extends LineupEntryUpsertArgs>(args: SelectSubset<T, LineupEntryUpsertArgs<ExtArgs>>): Prisma__LineupEntryClient<$Result.GetResult<Prisma.$LineupEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LineupEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineupEntryCountArgs} args - Arguments to filter LineupEntries to count.
     * @example
     * // Count the number of LineupEntries
     * const count = await prisma.lineupEntry.count({
     *   where: {
     *     // ... the filter for the LineupEntries we want to count
     *   }
     * })
    **/
    count<T extends LineupEntryCountArgs>(
      args?: Subset<T, LineupEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LineupEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LineupEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineupEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LineupEntryAggregateArgs>(args: Subset<T, LineupEntryAggregateArgs>): Prisma.PrismaPromise<GetLineupEntryAggregateType<T>>

    /**
     * Group by LineupEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineupEntryGroupByArgs} args - Group by arguments.
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
      T extends LineupEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LineupEntryGroupByArgs['orderBy'] }
        : { orderBy?: LineupEntryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LineupEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLineupEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LineupEntry model
   */
  readonly fields: LineupEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LineupEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LineupEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    festival<T extends FestivalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FestivalDefaultArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    artist<T extends ArtistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtistDefaultArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LineupEntry model
   */
  interface LineupEntryFieldRefs {
    readonly id: FieldRef<"LineupEntry", 'String'>
    readonly festivalId: FieldRef<"LineupEntry", 'String'>
    readonly artistId: FieldRef<"LineupEntry", 'String'>
    readonly year: FieldRef<"LineupEntry", 'Int'>
    readonly isHeadliner: FieldRef<"LineupEntry", 'Boolean'>
    readonly source: FieldRef<"LineupEntry", 'String'>
    readonly createdAt: FieldRef<"LineupEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LineupEntry findUnique
   */
  export type LineupEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * Filter, which LineupEntry to fetch.
     */
    where: LineupEntryWhereUniqueInput
  }

  /**
   * LineupEntry findUniqueOrThrow
   */
  export type LineupEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * Filter, which LineupEntry to fetch.
     */
    where: LineupEntryWhereUniqueInput
  }

  /**
   * LineupEntry findFirst
   */
  export type LineupEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * Filter, which LineupEntry to fetch.
     */
    where?: LineupEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineupEntries to fetch.
     */
    orderBy?: LineupEntryOrderByWithRelationInput | LineupEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LineupEntries.
     */
    cursor?: LineupEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineupEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineupEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LineupEntries.
     */
    distinct?: LineupEntryScalarFieldEnum | LineupEntryScalarFieldEnum[]
  }

  /**
   * LineupEntry findFirstOrThrow
   */
  export type LineupEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * Filter, which LineupEntry to fetch.
     */
    where?: LineupEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineupEntries to fetch.
     */
    orderBy?: LineupEntryOrderByWithRelationInput | LineupEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LineupEntries.
     */
    cursor?: LineupEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineupEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineupEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LineupEntries.
     */
    distinct?: LineupEntryScalarFieldEnum | LineupEntryScalarFieldEnum[]
  }

  /**
   * LineupEntry findMany
   */
  export type LineupEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * Filter, which LineupEntries to fetch.
     */
    where?: LineupEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LineupEntries to fetch.
     */
    orderBy?: LineupEntryOrderByWithRelationInput | LineupEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LineupEntries.
     */
    cursor?: LineupEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LineupEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LineupEntries.
     */
    skip?: number
    distinct?: LineupEntryScalarFieldEnum | LineupEntryScalarFieldEnum[]
  }

  /**
   * LineupEntry create
   */
  export type LineupEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a LineupEntry.
     */
    data: XOR<LineupEntryCreateInput, LineupEntryUncheckedCreateInput>
  }

  /**
   * LineupEntry createMany
   */
  export type LineupEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LineupEntries.
     */
    data: LineupEntryCreateManyInput | LineupEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LineupEntry createManyAndReturn
   */
  export type LineupEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * The data used to create many LineupEntries.
     */
    data: LineupEntryCreateManyInput | LineupEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LineupEntry update
   */
  export type LineupEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a LineupEntry.
     */
    data: XOR<LineupEntryUpdateInput, LineupEntryUncheckedUpdateInput>
    /**
     * Choose, which LineupEntry to update.
     */
    where: LineupEntryWhereUniqueInput
  }

  /**
   * LineupEntry updateMany
   */
  export type LineupEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LineupEntries.
     */
    data: XOR<LineupEntryUpdateManyMutationInput, LineupEntryUncheckedUpdateManyInput>
    /**
     * Filter which LineupEntries to update
     */
    where?: LineupEntryWhereInput
    /**
     * Limit how many LineupEntries to update.
     */
    limit?: number
  }

  /**
   * LineupEntry updateManyAndReturn
   */
  export type LineupEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * The data used to update LineupEntries.
     */
    data: XOR<LineupEntryUpdateManyMutationInput, LineupEntryUncheckedUpdateManyInput>
    /**
     * Filter which LineupEntries to update
     */
    where?: LineupEntryWhereInput
    /**
     * Limit how many LineupEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LineupEntry upsert
   */
  export type LineupEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the LineupEntry to update in case it exists.
     */
    where: LineupEntryWhereUniqueInput
    /**
     * In case the LineupEntry found by the `where` argument doesn't exist, create a new LineupEntry with this data.
     */
    create: XOR<LineupEntryCreateInput, LineupEntryUncheckedCreateInput>
    /**
     * In case the LineupEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LineupEntryUpdateInput, LineupEntryUncheckedUpdateInput>
  }

  /**
   * LineupEntry delete
   */
  export type LineupEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
    /**
     * Filter which LineupEntry to delete.
     */
    where: LineupEntryWhereUniqueInput
  }

  /**
   * LineupEntry deleteMany
   */
  export type LineupEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LineupEntries to delete
     */
    where?: LineupEntryWhereInput
    /**
     * Limit how many LineupEntries to delete.
     */
    limit?: number
  }

  /**
   * LineupEntry without action
   */
  export type LineupEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineupEntry
     */
    select?: LineupEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LineupEntry
     */
    omit?: LineupEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LineupEntryInclude<ExtArgs> | null
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
    name: 'name',
    role: 'role',
    googleUid: 'googleUid',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmailSubscriptionScalarFieldEnum: {
    id: 'id',
    email: 'email',
    region: 'region',
    token: 'token',
    createdAt: 'createdAt'
  };

  export type EmailSubscriptionScalarFieldEnum = (typeof EmailSubscriptionScalarFieldEnum)[keyof typeof EmailSubscriptionScalarFieldEnum]


  export const PromoterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    region: 'region',
    genreFocus: 'genreFocus',
    instagram: 'instagram',
    facebook: 'facebook',
    website: 'website',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PromoterScalarFieldEnum = (typeof PromoterScalarFieldEnum)[keyof typeof PromoterScalarFieldEnum]


  export const FestivalScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    status: 'status',
    region: 'region',
    location: 'location',
    genre: 'genre',
    costText: 'costText',
    dateText: 'dateText',
    startDate: 'startDate',
    endDate: 'endDate',
    notes: 'notes',
    website: 'website',
    approved: 'approved',
    vibe: 'vibe',
    camping: 'camping',
    ticketPrice: 'ticketPrice',
    ticketUrl: 'ticketUrl',
    latitude: 'latitude',
    longitude: 'longitude',
    promoterId: 'promoterId',
    submittedById: 'submittedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FestivalScalarFieldEnum = (typeof FestivalScalarFieldEnum)[keyof typeof FestivalScalarFieldEnum]


  export const ArtistScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    genre: 'genre',
    homeCity: 'homeCity',
    crew: 'crew',
    instagram: 'instagram',
    soundcloud: 'soundcloud',
    raUrl: 'raUrl',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArtistScalarFieldEnum = (typeof ArtistScalarFieldEnum)[keyof typeof ArtistScalarFieldEnum]


  export const LineupEntryScalarFieldEnum: {
    id: 'id',
    festivalId: 'festivalId',
    artistId: 'artistId',
    year: 'year',
    isHeadliner: 'isHeadliner',
    source: 'source',
    createdAt: 'createdAt'
  };

  export type LineupEntryScalarFieldEnum = (typeof LineupEntryScalarFieldEnum)[keyof typeof LineupEntryScalarFieldEnum]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Region'
   */
  export type EnumRegionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Region'>
    


  /**
   * Reference to a field of type 'Region[]'
   */
  export type ListEnumRegionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Region[]'>
    


  /**
   * Reference to a field of type 'FestivalStatus'
   */
  export type EnumFestivalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FestivalStatus'>
    


  /**
   * Reference to a field of type 'FestivalStatus[]'
   */
  export type ListEnumFestivalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FestivalStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    googleUid?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    festivals?: FestivalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    googleUid?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    festivals?: FestivalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleUid?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    festivals?: FestivalListRelationFilter
  }, "id" | "email" | "googleUid">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    googleUid?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    googleUid?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EmailSubscriptionWhereInput = {
    AND?: EmailSubscriptionWhereInput | EmailSubscriptionWhereInput[]
    OR?: EmailSubscriptionWhereInput[]
    NOT?: EmailSubscriptionWhereInput | EmailSubscriptionWhereInput[]
    id?: StringFilter<"EmailSubscription"> | string
    email?: StringFilter<"EmailSubscription"> | string
    region?: EnumRegionFilter<"EmailSubscription"> | $Enums.Region
    token?: StringFilter<"EmailSubscription"> | string
    createdAt?: DateTimeFilter<"EmailSubscription"> | Date | string
  }

  export type EmailSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    region?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    email_region?: EmailSubscriptionEmailRegionCompoundUniqueInput
    AND?: EmailSubscriptionWhereInput | EmailSubscriptionWhereInput[]
    OR?: EmailSubscriptionWhereInput[]
    NOT?: EmailSubscriptionWhereInput | EmailSubscriptionWhereInput[]
    email?: StringFilter<"EmailSubscription"> | string
    region?: EnumRegionFilter<"EmailSubscription"> | $Enums.Region
    createdAt?: DateTimeFilter<"EmailSubscription"> | Date | string
  }, "id" | "token" | "email_region">

  export type EmailSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    region?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    _count?: EmailSubscriptionCountOrderByAggregateInput
    _max?: EmailSubscriptionMaxOrderByAggregateInput
    _min?: EmailSubscriptionMinOrderByAggregateInput
  }

  export type EmailSubscriptionScalarWhereWithAggregatesInput = {
    AND?: EmailSubscriptionScalarWhereWithAggregatesInput | EmailSubscriptionScalarWhereWithAggregatesInput[]
    OR?: EmailSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: EmailSubscriptionScalarWhereWithAggregatesInput | EmailSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailSubscription"> | string
    email?: StringWithAggregatesFilter<"EmailSubscription"> | string
    region?: EnumRegionWithAggregatesFilter<"EmailSubscription"> | $Enums.Region
    token?: StringWithAggregatesFilter<"EmailSubscription"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailSubscription"> | Date | string
  }

  export type PromoterWhereInput = {
    AND?: PromoterWhereInput | PromoterWhereInput[]
    OR?: PromoterWhereInput[]
    NOT?: PromoterWhereInput | PromoterWhereInput[]
    id?: StringFilter<"Promoter"> | string
    name?: StringFilter<"Promoter"> | string
    slug?: StringFilter<"Promoter"> | string
    region?: StringNullableFilter<"Promoter"> | string | null
    genreFocus?: StringNullableFilter<"Promoter"> | string | null
    instagram?: StringNullableFilter<"Promoter"> | string | null
    facebook?: StringNullableFilter<"Promoter"> | string | null
    website?: StringNullableFilter<"Promoter"> | string | null
    notes?: StringNullableFilter<"Promoter"> | string | null
    createdAt?: DateTimeFilter<"Promoter"> | Date | string
    updatedAt?: DateTimeFilter<"Promoter"> | Date | string
    festivals?: FestivalListRelationFilter
  }

  export type PromoterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    region?: SortOrderInput | SortOrder
    genreFocus?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    festivals?: FestivalOrderByRelationAggregateInput
  }

  export type PromoterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: PromoterWhereInput | PromoterWhereInput[]
    OR?: PromoterWhereInput[]
    NOT?: PromoterWhereInput | PromoterWhereInput[]
    region?: StringNullableFilter<"Promoter"> | string | null
    genreFocus?: StringNullableFilter<"Promoter"> | string | null
    instagram?: StringNullableFilter<"Promoter"> | string | null
    facebook?: StringNullableFilter<"Promoter"> | string | null
    website?: StringNullableFilter<"Promoter"> | string | null
    notes?: StringNullableFilter<"Promoter"> | string | null
    createdAt?: DateTimeFilter<"Promoter"> | Date | string
    updatedAt?: DateTimeFilter<"Promoter"> | Date | string
    festivals?: FestivalListRelationFilter
  }, "id" | "name" | "slug">

  export type PromoterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    region?: SortOrderInput | SortOrder
    genreFocus?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PromoterCountOrderByAggregateInput
    _max?: PromoterMaxOrderByAggregateInput
    _min?: PromoterMinOrderByAggregateInput
  }

  export type PromoterScalarWhereWithAggregatesInput = {
    AND?: PromoterScalarWhereWithAggregatesInput | PromoterScalarWhereWithAggregatesInput[]
    OR?: PromoterScalarWhereWithAggregatesInput[]
    NOT?: PromoterScalarWhereWithAggregatesInput | PromoterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Promoter"> | string
    name?: StringWithAggregatesFilter<"Promoter"> | string
    slug?: StringWithAggregatesFilter<"Promoter"> | string
    region?: StringNullableWithAggregatesFilter<"Promoter"> | string | null
    genreFocus?: StringNullableWithAggregatesFilter<"Promoter"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"Promoter"> | string | null
    facebook?: StringNullableWithAggregatesFilter<"Promoter"> | string | null
    website?: StringNullableWithAggregatesFilter<"Promoter"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Promoter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Promoter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Promoter"> | Date | string
  }

  export type FestivalWhereInput = {
    AND?: FestivalWhereInput | FestivalWhereInput[]
    OR?: FestivalWhereInput[]
    NOT?: FestivalWhereInput | FestivalWhereInput[]
    id?: StringFilter<"Festival"> | string
    name?: StringFilter<"Festival"> | string
    slug?: StringFilter<"Festival"> | string
    status?: EnumFestivalStatusFilter<"Festival"> | $Enums.FestivalStatus
    region?: EnumRegionNullableFilter<"Festival"> | $Enums.Region | null
    location?: StringNullableFilter<"Festival"> | string | null
    genre?: StringNullableFilter<"Festival"> | string | null
    costText?: StringNullableFilter<"Festival"> | string | null
    dateText?: StringNullableFilter<"Festival"> | string | null
    startDate?: DateTimeNullableFilter<"Festival"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Festival"> | Date | string | null
    notes?: StringNullableFilter<"Festival"> | string | null
    website?: StringNullableFilter<"Festival"> | string | null
    approved?: BoolFilter<"Festival"> | boolean
    vibe?: StringNullableFilter<"Festival"> | string | null
    camping?: BoolNullableFilter<"Festival"> | boolean | null
    ticketPrice?: StringNullableFilter<"Festival"> | string | null
    ticketUrl?: StringNullableFilter<"Festival"> | string | null
    latitude?: FloatNullableFilter<"Festival"> | number | null
    longitude?: FloatNullableFilter<"Festival"> | number | null
    promoterId?: StringNullableFilter<"Festival"> | string | null
    submittedById?: StringNullableFilter<"Festival"> | string | null
    createdAt?: DateTimeFilter<"Festival"> | Date | string
    updatedAt?: DateTimeFilter<"Festival"> | Date | string
    promoter?: XOR<PromoterNullableScalarRelationFilter, PromoterWhereInput> | null
    submittedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    lineups?: LineupEntryListRelationFilter
  }

  export type FestivalOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    region?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    costText?: SortOrderInput | SortOrder
    dateText?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    approved?: SortOrder
    vibe?: SortOrderInput | SortOrder
    camping?: SortOrderInput | SortOrder
    ticketPrice?: SortOrderInput | SortOrder
    ticketUrl?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    promoterId?: SortOrderInput | SortOrder
    submittedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    promoter?: PromoterOrderByWithRelationInput
    submittedBy?: UserOrderByWithRelationInput
    lineups?: LineupEntryOrderByRelationAggregateInput
  }

  export type FestivalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: FestivalWhereInput | FestivalWhereInput[]
    OR?: FestivalWhereInput[]
    NOT?: FestivalWhereInput | FestivalWhereInput[]
    name?: StringFilter<"Festival"> | string
    status?: EnumFestivalStatusFilter<"Festival"> | $Enums.FestivalStatus
    region?: EnumRegionNullableFilter<"Festival"> | $Enums.Region | null
    location?: StringNullableFilter<"Festival"> | string | null
    genre?: StringNullableFilter<"Festival"> | string | null
    costText?: StringNullableFilter<"Festival"> | string | null
    dateText?: StringNullableFilter<"Festival"> | string | null
    startDate?: DateTimeNullableFilter<"Festival"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Festival"> | Date | string | null
    notes?: StringNullableFilter<"Festival"> | string | null
    website?: StringNullableFilter<"Festival"> | string | null
    approved?: BoolFilter<"Festival"> | boolean
    vibe?: StringNullableFilter<"Festival"> | string | null
    camping?: BoolNullableFilter<"Festival"> | boolean | null
    ticketPrice?: StringNullableFilter<"Festival"> | string | null
    ticketUrl?: StringNullableFilter<"Festival"> | string | null
    latitude?: FloatNullableFilter<"Festival"> | number | null
    longitude?: FloatNullableFilter<"Festival"> | number | null
    promoterId?: StringNullableFilter<"Festival"> | string | null
    submittedById?: StringNullableFilter<"Festival"> | string | null
    createdAt?: DateTimeFilter<"Festival"> | Date | string
    updatedAt?: DateTimeFilter<"Festival"> | Date | string
    promoter?: XOR<PromoterNullableScalarRelationFilter, PromoterWhereInput> | null
    submittedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    lineups?: LineupEntryListRelationFilter
  }, "id" | "slug">

  export type FestivalOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    region?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    costText?: SortOrderInput | SortOrder
    dateText?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    approved?: SortOrder
    vibe?: SortOrderInput | SortOrder
    camping?: SortOrderInput | SortOrder
    ticketPrice?: SortOrderInput | SortOrder
    ticketUrl?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    promoterId?: SortOrderInput | SortOrder
    submittedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FestivalCountOrderByAggregateInput
    _avg?: FestivalAvgOrderByAggregateInput
    _max?: FestivalMaxOrderByAggregateInput
    _min?: FestivalMinOrderByAggregateInput
    _sum?: FestivalSumOrderByAggregateInput
  }

  export type FestivalScalarWhereWithAggregatesInput = {
    AND?: FestivalScalarWhereWithAggregatesInput | FestivalScalarWhereWithAggregatesInput[]
    OR?: FestivalScalarWhereWithAggregatesInput[]
    NOT?: FestivalScalarWhereWithAggregatesInput | FestivalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Festival"> | string
    name?: StringWithAggregatesFilter<"Festival"> | string
    slug?: StringWithAggregatesFilter<"Festival"> | string
    status?: EnumFestivalStatusWithAggregatesFilter<"Festival"> | $Enums.FestivalStatus
    region?: EnumRegionNullableWithAggregatesFilter<"Festival"> | $Enums.Region | null
    location?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    genre?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    costText?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    dateText?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Festival"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Festival"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    website?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    approved?: BoolWithAggregatesFilter<"Festival"> | boolean
    vibe?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    camping?: BoolNullableWithAggregatesFilter<"Festival"> | boolean | null
    ticketPrice?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    ticketUrl?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Festival"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Festival"> | number | null
    promoterId?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    submittedById?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Festival"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Festival"> | Date | string
  }

  export type ArtistWhereInput = {
    AND?: ArtistWhereInput | ArtistWhereInput[]
    OR?: ArtistWhereInput[]
    NOT?: ArtistWhereInput | ArtistWhereInput[]
    id?: StringFilter<"Artist"> | string
    name?: StringFilter<"Artist"> | string
    slug?: StringFilter<"Artist"> | string
    genre?: StringNullableFilter<"Artist"> | string | null
    homeCity?: StringNullableFilter<"Artist"> | string | null
    crew?: StringNullableFilter<"Artist"> | string | null
    instagram?: StringNullableFilter<"Artist"> | string | null
    soundcloud?: StringNullableFilter<"Artist"> | string | null
    raUrl?: StringNullableFilter<"Artist"> | string | null
    notes?: StringNullableFilter<"Artist"> | string | null
    createdAt?: DateTimeFilter<"Artist"> | Date | string
    updatedAt?: DateTimeFilter<"Artist"> | Date | string
    lineups?: LineupEntryListRelationFilter
  }

  export type ArtistOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    genre?: SortOrderInput | SortOrder
    homeCity?: SortOrderInput | SortOrder
    crew?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    soundcloud?: SortOrderInput | SortOrder
    raUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lineups?: LineupEntryOrderByRelationAggregateInput
  }

  export type ArtistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: ArtistWhereInput | ArtistWhereInput[]
    OR?: ArtistWhereInput[]
    NOT?: ArtistWhereInput | ArtistWhereInput[]
    genre?: StringNullableFilter<"Artist"> | string | null
    homeCity?: StringNullableFilter<"Artist"> | string | null
    crew?: StringNullableFilter<"Artist"> | string | null
    instagram?: StringNullableFilter<"Artist"> | string | null
    soundcloud?: StringNullableFilter<"Artist"> | string | null
    raUrl?: StringNullableFilter<"Artist"> | string | null
    notes?: StringNullableFilter<"Artist"> | string | null
    createdAt?: DateTimeFilter<"Artist"> | Date | string
    updatedAt?: DateTimeFilter<"Artist"> | Date | string
    lineups?: LineupEntryListRelationFilter
  }, "id" | "name" | "slug">

  export type ArtistOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    genre?: SortOrderInput | SortOrder
    homeCity?: SortOrderInput | SortOrder
    crew?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    soundcloud?: SortOrderInput | SortOrder
    raUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArtistCountOrderByAggregateInput
    _max?: ArtistMaxOrderByAggregateInput
    _min?: ArtistMinOrderByAggregateInput
  }

  export type ArtistScalarWhereWithAggregatesInput = {
    AND?: ArtistScalarWhereWithAggregatesInput | ArtistScalarWhereWithAggregatesInput[]
    OR?: ArtistScalarWhereWithAggregatesInput[]
    NOT?: ArtistScalarWhereWithAggregatesInput | ArtistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Artist"> | string
    name?: StringWithAggregatesFilter<"Artist"> | string
    slug?: StringWithAggregatesFilter<"Artist"> | string
    genre?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    homeCity?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    crew?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    soundcloud?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    raUrl?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Artist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Artist"> | Date | string
  }

  export type LineupEntryWhereInput = {
    AND?: LineupEntryWhereInput | LineupEntryWhereInput[]
    OR?: LineupEntryWhereInput[]
    NOT?: LineupEntryWhereInput | LineupEntryWhereInput[]
    id?: StringFilter<"LineupEntry"> | string
    festivalId?: StringFilter<"LineupEntry"> | string
    artistId?: StringFilter<"LineupEntry"> | string
    year?: IntFilter<"LineupEntry"> | number
    isHeadliner?: BoolFilter<"LineupEntry"> | boolean
    source?: StringNullableFilter<"LineupEntry"> | string | null
    createdAt?: DateTimeFilter<"LineupEntry"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    artist?: XOR<ArtistScalarRelationFilter, ArtistWhereInput>
  }

  export type LineupEntryOrderByWithRelationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    artistId?: SortOrder
    year?: SortOrder
    isHeadliner?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    festival?: FestivalOrderByWithRelationInput
    artist?: ArtistOrderByWithRelationInput
  }

  export type LineupEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    festivalId_artistId_year?: LineupEntryFestivalIdArtistIdYearCompoundUniqueInput
    AND?: LineupEntryWhereInput | LineupEntryWhereInput[]
    OR?: LineupEntryWhereInput[]
    NOT?: LineupEntryWhereInput | LineupEntryWhereInput[]
    festivalId?: StringFilter<"LineupEntry"> | string
    artistId?: StringFilter<"LineupEntry"> | string
    year?: IntFilter<"LineupEntry"> | number
    isHeadliner?: BoolFilter<"LineupEntry"> | boolean
    source?: StringNullableFilter<"LineupEntry"> | string | null
    createdAt?: DateTimeFilter<"LineupEntry"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    artist?: XOR<ArtistScalarRelationFilter, ArtistWhereInput>
  }, "id" | "festivalId_artistId_year">

  export type LineupEntryOrderByWithAggregationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    artistId?: SortOrder
    year?: SortOrder
    isHeadliner?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LineupEntryCountOrderByAggregateInput
    _avg?: LineupEntryAvgOrderByAggregateInput
    _max?: LineupEntryMaxOrderByAggregateInput
    _min?: LineupEntryMinOrderByAggregateInput
    _sum?: LineupEntrySumOrderByAggregateInput
  }

  export type LineupEntryScalarWhereWithAggregatesInput = {
    AND?: LineupEntryScalarWhereWithAggregatesInput | LineupEntryScalarWhereWithAggregatesInput[]
    OR?: LineupEntryScalarWhereWithAggregatesInput[]
    NOT?: LineupEntryScalarWhereWithAggregatesInput | LineupEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LineupEntry"> | string
    festivalId?: StringWithAggregatesFilter<"LineupEntry"> | string
    artistId?: StringWithAggregatesFilter<"LineupEntry"> | string
    year?: IntWithAggregatesFilter<"LineupEntry"> | number
    isHeadliner?: BoolWithAggregatesFilter<"LineupEntry"> | boolean
    source?: StringNullableWithAggregatesFilter<"LineupEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LineupEntry"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    googleUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    festivals?: FestivalCreateNestedManyWithoutSubmittedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    googleUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    festivals?: FestivalUncheckedCreateNestedManyWithoutSubmittedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    googleUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festivals?: FestivalUpdateManyWithoutSubmittedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    googleUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festivals?: FestivalUncheckedUpdateManyWithoutSubmittedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    googleUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    googleUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    googleUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriptionCreateInput = {
    id?: string
    email: string
    region: $Enums.Region
    token?: string
    createdAt?: Date | string
  }

  export type EmailSubscriptionUncheckedCreateInput = {
    id?: string
    email: string
    region: $Enums.Region
    token?: string
    createdAt?: Date | string
  }

  export type EmailSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    region?: EnumRegionFieldUpdateOperationsInput | $Enums.Region
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    region?: EnumRegionFieldUpdateOperationsInput | $Enums.Region
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriptionCreateManyInput = {
    id?: string
    email: string
    region: $Enums.Region
    token?: string
    createdAt?: Date | string
  }

  export type EmailSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    region?: EnumRegionFieldUpdateOperationsInput | $Enums.Region
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    region?: EnumRegionFieldUpdateOperationsInput | $Enums.Region
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoterCreateInput = {
    id?: string
    name: string
    slug: string
    region?: string | null
    genreFocus?: string | null
    instagram?: string | null
    facebook?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    festivals?: FestivalCreateNestedManyWithoutPromoterInput
  }

  export type PromoterUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    region?: string | null
    genreFocus?: string | null
    instagram?: string | null
    facebook?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    festivals?: FestivalUncheckedCreateNestedManyWithoutPromoterInput
  }

  export type PromoterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genreFocus?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festivals?: FestivalUpdateManyWithoutPromoterNestedInput
  }

  export type PromoterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genreFocus?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festivals?: FestivalUncheckedUpdateManyWithoutPromoterNestedInput
  }

  export type PromoterCreateManyInput = {
    id?: string
    name: string
    slug: string
    region?: string | null
    genreFocus?: string | null
    instagram?: string | null
    facebook?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromoterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genreFocus?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genreFocus?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalCreateInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoter?: PromoterCreateNestedOneWithoutFestivalsInput
    submittedBy?: UserCreateNestedOneWithoutFestivalsInput
    lineups?: LineupEntryCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    promoterId?: string | null
    submittedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineups?: LineupEntryUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoter?: PromoterUpdateOneWithoutFestivalsNestedInput
    submittedBy?: UserUpdateOneWithoutFestivalsNestedInput
    lineups?: LineupEntryUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    promoterId?: NullableStringFieldUpdateOperationsInput | string | null
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineups?: LineupEntryUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalCreateManyInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    promoterId?: string | null
    submittedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FestivalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    promoterId?: NullableStringFieldUpdateOperationsInput | string | null
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtistCreateInput = {
    id?: string
    name: string
    slug: string
    genre?: string | null
    homeCity?: string | null
    crew?: string | null
    instagram?: string | null
    soundcloud?: string | null
    raUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineups?: LineupEntryCreateNestedManyWithoutArtistInput
  }

  export type ArtistUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    genre?: string | null
    homeCity?: string | null
    crew?: string | null
    instagram?: string | null
    soundcloud?: string | null
    raUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineups?: LineupEntryUncheckedCreateNestedManyWithoutArtistInput
  }

  export type ArtistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    homeCity?: NullableStringFieldUpdateOperationsInput | string | null
    crew?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    soundcloud?: NullableStringFieldUpdateOperationsInput | string | null
    raUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineups?: LineupEntryUpdateManyWithoutArtistNestedInput
  }

  export type ArtistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    homeCity?: NullableStringFieldUpdateOperationsInput | string | null
    crew?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    soundcloud?: NullableStringFieldUpdateOperationsInput | string | null
    raUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineups?: LineupEntryUncheckedUpdateManyWithoutArtistNestedInput
  }

  export type ArtistCreateManyInput = {
    id?: string
    name: string
    slug: string
    genre?: string | null
    homeCity?: string | null
    crew?: string | null
    instagram?: string | null
    soundcloud?: string | null
    raUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    homeCity?: NullableStringFieldUpdateOperationsInput | string | null
    crew?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    soundcloud?: NullableStringFieldUpdateOperationsInput | string | null
    raUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    homeCity?: NullableStringFieldUpdateOperationsInput | string | null
    crew?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    soundcloud?: NullableStringFieldUpdateOperationsInput | string | null
    raUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryCreateInput = {
    id?: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
    festival: FestivalCreateNestedOneWithoutLineupsInput
    artist: ArtistCreateNestedOneWithoutLineupsInput
  }

  export type LineupEntryUncheckedCreateInput = {
    id?: string
    festivalId: string
    artistId: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
  }

  export type LineupEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutLineupsNestedInput
    artist?: ArtistUpdateOneRequiredWithoutLineupsNestedInput
  }

  export type LineupEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    festivalId?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryCreateManyInput = {
    id?: string
    festivalId: string
    artistId: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
  }

  export type LineupEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    festivalId?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type FestivalListRelationFilter = {
    every?: FestivalWhereInput
    some?: FestivalWhereInput
    none?: FestivalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FestivalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    googleUid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    googleUid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    googleUid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type EnumRegionFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel>
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    not?: NestedEnumRegionFilter<$PrismaModel> | $Enums.Region
  }

  export type EmailSubscriptionEmailRegionCompoundUniqueInput = {
    email: string
    region: $Enums.Region
  }

  export type EmailSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    region?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    region?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    region?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRegionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel>
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    not?: NestedEnumRegionWithAggregatesFilter<$PrismaModel> | $Enums.Region
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegionFilter<$PrismaModel>
    _max?: NestedEnumRegionFilter<$PrismaModel>
  }

  export type PromoterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    region?: SortOrder
    genreFocus?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromoterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    region?: SortOrder
    genreFocus?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromoterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    region?: SortOrder
    genreFocus?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumFestivalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FestivalStatus | EnumFestivalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFestivalStatusFilter<$PrismaModel> | $Enums.FestivalStatus
  }

  export type EnumRegionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegionNullableFilter<$PrismaModel> | $Enums.Region | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PromoterNullableScalarRelationFilter = {
    is?: PromoterWhereInput | null
    isNot?: PromoterWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type LineupEntryListRelationFilter = {
    every?: LineupEntryWhereInput
    some?: LineupEntryWhereInput
    none?: LineupEntryWhereInput
  }

  export type LineupEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FestivalCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    region?: SortOrder
    location?: SortOrder
    genre?: SortOrder
    costText?: SortOrder
    dateText?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    notes?: SortOrder
    website?: SortOrder
    approved?: SortOrder
    vibe?: SortOrder
    camping?: SortOrder
    ticketPrice?: SortOrder
    ticketUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    promoterId?: SortOrder
    submittedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FestivalAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FestivalMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    region?: SortOrder
    location?: SortOrder
    genre?: SortOrder
    costText?: SortOrder
    dateText?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    notes?: SortOrder
    website?: SortOrder
    approved?: SortOrder
    vibe?: SortOrder
    camping?: SortOrder
    ticketPrice?: SortOrder
    ticketUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    promoterId?: SortOrder
    submittedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FestivalMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    region?: SortOrder
    location?: SortOrder
    genre?: SortOrder
    costText?: SortOrder
    dateText?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    notes?: SortOrder
    website?: SortOrder
    approved?: SortOrder
    vibe?: SortOrder
    camping?: SortOrder
    ticketPrice?: SortOrder
    ticketUrl?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    promoterId?: SortOrder
    submittedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FestivalSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type EnumFestivalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FestivalStatus | EnumFestivalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFestivalStatusWithAggregatesFilter<$PrismaModel> | $Enums.FestivalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFestivalStatusFilter<$PrismaModel>
    _max?: NestedEnumFestivalStatusFilter<$PrismaModel>
  }

  export type EnumRegionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegionNullableWithAggregatesFilter<$PrismaModel> | $Enums.Region | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRegionNullableFilter<$PrismaModel>
    _max?: NestedEnumRegionNullableFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ArtistCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    genre?: SortOrder
    homeCity?: SortOrder
    crew?: SortOrder
    instagram?: SortOrder
    soundcloud?: SortOrder
    raUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtistMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    genre?: SortOrder
    homeCity?: SortOrder
    crew?: SortOrder
    instagram?: SortOrder
    soundcloud?: SortOrder
    raUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtistMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    genre?: SortOrder
    homeCity?: SortOrder
    crew?: SortOrder
    instagram?: SortOrder
    soundcloud?: SortOrder
    raUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type FestivalScalarRelationFilter = {
    is?: FestivalWhereInput
    isNot?: FestivalWhereInput
  }

  export type ArtistScalarRelationFilter = {
    is?: ArtistWhereInput
    isNot?: ArtistWhereInput
  }

  export type LineupEntryFestivalIdArtistIdYearCompoundUniqueInput = {
    festivalId: string
    artistId: string
    year: number
  }

  export type LineupEntryCountOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    artistId?: SortOrder
    year?: SortOrder
    isHeadliner?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type LineupEntryAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type LineupEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    artistId?: SortOrder
    year?: SortOrder
    isHeadliner?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type LineupEntryMinOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    artistId?: SortOrder
    year?: SortOrder
    isHeadliner?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type LineupEntrySumOrderByAggregateInput = {
    year?: SortOrder
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

  export type FestivalCreateNestedManyWithoutSubmittedByInput = {
    create?: XOR<FestivalCreateWithoutSubmittedByInput, FestivalUncheckedCreateWithoutSubmittedByInput> | FestivalCreateWithoutSubmittedByInput[] | FestivalUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutSubmittedByInput | FestivalCreateOrConnectWithoutSubmittedByInput[]
    createMany?: FestivalCreateManySubmittedByInputEnvelope
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
  }

  export type FestivalUncheckedCreateNestedManyWithoutSubmittedByInput = {
    create?: XOR<FestivalCreateWithoutSubmittedByInput, FestivalUncheckedCreateWithoutSubmittedByInput> | FestivalCreateWithoutSubmittedByInput[] | FestivalUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutSubmittedByInput | FestivalCreateOrConnectWithoutSubmittedByInput[]
    createMany?: FestivalCreateManySubmittedByInputEnvelope
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FestivalUpdateManyWithoutSubmittedByNestedInput = {
    create?: XOR<FestivalCreateWithoutSubmittedByInput, FestivalUncheckedCreateWithoutSubmittedByInput> | FestivalCreateWithoutSubmittedByInput[] | FestivalUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutSubmittedByInput | FestivalCreateOrConnectWithoutSubmittedByInput[]
    upsert?: FestivalUpsertWithWhereUniqueWithoutSubmittedByInput | FestivalUpsertWithWhereUniqueWithoutSubmittedByInput[]
    createMany?: FestivalCreateManySubmittedByInputEnvelope
    set?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    disconnect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    delete?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    update?: FestivalUpdateWithWhereUniqueWithoutSubmittedByInput | FestivalUpdateWithWhereUniqueWithoutSubmittedByInput[]
    updateMany?: FestivalUpdateManyWithWhereWithoutSubmittedByInput | FestivalUpdateManyWithWhereWithoutSubmittedByInput[]
    deleteMany?: FestivalScalarWhereInput | FestivalScalarWhereInput[]
  }

  export type FestivalUncheckedUpdateManyWithoutSubmittedByNestedInput = {
    create?: XOR<FestivalCreateWithoutSubmittedByInput, FestivalUncheckedCreateWithoutSubmittedByInput> | FestivalCreateWithoutSubmittedByInput[] | FestivalUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutSubmittedByInput | FestivalCreateOrConnectWithoutSubmittedByInput[]
    upsert?: FestivalUpsertWithWhereUniqueWithoutSubmittedByInput | FestivalUpsertWithWhereUniqueWithoutSubmittedByInput[]
    createMany?: FestivalCreateManySubmittedByInputEnvelope
    set?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    disconnect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    delete?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    update?: FestivalUpdateWithWhereUniqueWithoutSubmittedByInput | FestivalUpdateWithWhereUniqueWithoutSubmittedByInput[]
    updateMany?: FestivalUpdateManyWithWhereWithoutSubmittedByInput | FestivalUpdateManyWithWhereWithoutSubmittedByInput[]
    deleteMany?: FestivalScalarWhereInput | FestivalScalarWhereInput[]
  }

  export type EnumRegionFieldUpdateOperationsInput = {
    set?: $Enums.Region
  }

  export type FestivalCreateNestedManyWithoutPromoterInput = {
    create?: XOR<FestivalCreateWithoutPromoterInput, FestivalUncheckedCreateWithoutPromoterInput> | FestivalCreateWithoutPromoterInput[] | FestivalUncheckedCreateWithoutPromoterInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutPromoterInput | FestivalCreateOrConnectWithoutPromoterInput[]
    createMany?: FestivalCreateManyPromoterInputEnvelope
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
  }

  export type FestivalUncheckedCreateNestedManyWithoutPromoterInput = {
    create?: XOR<FestivalCreateWithoutPromoterInput, FestivalUncheckedCreateWithoutPromoterInput> | FestivalCreateWithoutPromoterInput[] | FestivalUncheckedCreateWithoutPromoterInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutPromoterInput | FestivalCreateOrConnectWithoutPromoterInput[]
    createMany?: FestivalCreateManyPromoterInputEnvelope
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
  }

  export type FestivalUpdateManyWithoutPromoterNestedInput = {
    create?: XOR<FestivalCreateWithoutPromoterInput, FestivalUncheckedCreateWithoutPromoterInput> | FestivalCreateWithoutPromoterInput[] | FestivalUncheckedCreateWithoutPromoterInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutPromoterInput | FestivalCreateOrConnectWithoutPromoterInput[]
    upsert?: FestivalUpsertWithWhereUniqueWithoutPromoterInput | FestivalUpsertWithWhereUniqueWithoutPromoterInput[]
    createMany?: FestivalCreateManyPromoterInputEnvelope
    set?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    disconnect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    delete?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    update?: FestivalUpdateWithWhereUniqueWithoutPromoterInput | FestivalUpdateWithWhereUniqueWithoutPromoterInput[]
    updateMany?: FestivalUpdateManyWithWhereWithoutPromoterInput | FestivalUpdateManyWithWhereWithoutPromoterInput[]
    deleteMany?: FestivalScalarWhereInput | FestivalScalarWhereInput[]
  }

  export type FestivalUncheckedUpdateManyWithoutPromoterNestedInput = {
    create?: XOR<FestivalCreateWithoutPromoterInput, FestivalUncheckedCreateWithoutPromoterInput> | FestivalCreateWithoutPromoterInput[] | FestivalUncheckedCreateWithoutPromoterInput[]
    connectOrCreate?: FestivalCreateOrConnectWithoutPromoterInput | FestivalCreateOrConnectWithoutPromoterInput[]
    upsert?: FestivalUpsertWithWhereUniqueWithoutPromoterInput | FestivalUpsertWithWhereUniqueWithoutPromoterInput[]
    createMany?: FestivalCreateManyPromoterInputEnvelope
    set?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    disconnect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    delete?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    connect?: FestivalWhereUniqueInput | FestivalWhereUniqueInput[]
    update?: FestivalUpdateWithWhereUniqueWithoutPromoterInput | FestivalUpdateWithWhereUniqueWithoutPromoterInput[]
    updateMany?: FestivalUpdateManyWithWhereWithoutPromoterInput | FestivalUpdateManyWithWhereWithoutPromoterInput[]
    deleteMany?: FestivalScalarWhereInput | FestivalScalarWhereInput[]
  }

  export type PromoterCreateNestedOneWithoutFestivalsInput = {
    create?: XOR<PromoterCreateWithoutFestivalsInput, PromoterUncheckedCreateWithoutFestivalsInput>
    connectOrCreate?: PromoterCreateOrConnectWithoutFestivalsInput
    connect?: PromoterWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFestivalsInput = {
    create?: XOR<UserCreateWithoutFestivalsInput, UserUncheckedCreateWithoutFestivalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFestivalsInput
    connect?: UserWhereUniqueInput
  }

  export type LineupEntryCreateNestedManyWithoutFestivalInput = {
    create?: XOR<LineupEntryCreateWithoutFestivalInput, LineupEntryUncheckedCreateWithoutFestivalInput> | LineupEntryCreateWithoutFestivalInput[] | LineupEntryUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutFestivalInput | LineupEntryCreateOrConnectWithoutFestivalInput[]
    createMany?: LineupEntryCreateManyFestivalInputEnvelope
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
  }

  export type LineupEntryUncheckedCreateNestedManyWithoutFestivalInput = {
    create?: XOR<LineupEntryCreateWithoutFestivalInput, LineupEntryUncheckedCreateWithoutFestivalInput> | LineupEntryCreateWithoutFestivalInput[] | LineupEntryUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutFestivalInput | LineupEntryCreateOrConnectWithoutFestivalInput[]
    createMany?: LineupEntryCreateManyFestivalInputEnvelope
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
  }

  export type EnumFestivalStatusFieldUpdateOperationsInput = {
    set?: $Enums.FestivalStatus
  }

  export type NullableEnumRegionFieldUpdateOperationsInput = {
    set?: $Enums.Region | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PromoterUpdateOneWithoutFestivalsNestedInput = {
    create?: XOR<PromoterCreateWithoutFestivalsInput, PromoterUncheckedCreateWithoutFestivalsInput>
    connectOrCreate?: PromoterCreateOrConnectWithoutFestivalsInput
    upsert?: PromoterUpsertWithoutFestivalsInput
    disconnect?: PromoterWhereInput | boolean
    delete?: PromoterWhereInput | boolean
    connect?: PromoterWhereUniqueInput
    update?: XOR<XOR<PromoterUpdateToOneWithWhereWithoutFestivalsInput, PromoterUpdateWithoutFestivalsInput>, PromoterUncheckedUpdateWithoutFestivalsInput>
  }

  export type UserUpdateOneWithoutFestivalsNestedInput = {
    create?: XOR<UserCreateWithoutFestivalsInput, UserUncheckedCreateWithoutFestivalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFestivalsInput
    upsert?: UserUpsertWithoutFestivalsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFestivalsInput, UserUpdateWithoutFestivalsInput>, UserUncheckedUpdateWithoutFestivalsInput>
  }

  export type LineupEntryUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<LineupEntryCreateWithoutFestivalInput, LineupEntryUncheckedCreateWithoutFestivalInput> | LineupEntryCreateWithoutFestivalInput[] | LineupEntryUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutFestivalInput | LineupEntryCreateOrConnectWithoutFestivalInput[]
    upsert?: LineupEntryUpsertWithWhereUniqueWithoutFestivalInput | LineupEntryUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: LineupEntryCreateManyFestivalInputEnvelope
    set?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    disconnect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    delete?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    update?: LineupEntryUpdateWithWhereUniqueWithoutFestivalInput | LineupEntryUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: LineupEntryUpdateManyWithWhereWithoutFestivalInput | LineupEntryUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: LineupEntryScalarWhereInput | LineupEntryScalarWhereInput[]
  }

  export type LineupEntryUncheckedUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<LineupEntryCreateWithoutFestivalInput, LineupEntryUncheckedCreateWithoutFestivalInput> | LineupEntryCreateWithoutFestivalInput[] | LineupEntryUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutFestivalInput | LineupEntryCreateOrConnectWithoutFestivalInput[]
    upsert?: LineupEntryUpsertWithWhereUniqueWithoutFestivalInput | LineupEntryUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: LineupEntryCreateManyFestivalInputEnvelope
    set?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    disconnect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    delete?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    update?: LineupEntryUpdateWithWhereUniqueWithoutFestivalInput | LineupEntryUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: LineupEntryUpdateManyWithWhereWithoutFestivalInput | LineupEntryUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: LineupEntryScalarWhereInput | LineupEntryScalarWhereInput[]
  }

  export type LineupEntryCreateNestedManyWithoutArtistInput = {
    create?: XOR<LineupEntryCreateWithoutArtistInput, LineupEntryUncheckedCreateWithoutArtistInput> | LineupEntryCreateWithoutArtistInput[] | LineupEntryUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutArtistInput | LineupEntryCreateOrConnectWithoutArtistInput[]
    createMany?: LineupEntryCreateManyArtistInputEnvelope
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
  }

  export type LineupEntryUncheckedCreateNestedManyWithoutArtistInput = {
    create?: XOR<LineupEntryCreateWithoutArtistInput, LineupEntryUncheckedCreateWithoutArtistInput> | LineupEntryCreateWithoutArtistInput[] | LineupEntryUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutArtistInput | LineupEntryCreateOrConnectWithoutArtistInput[]
    createMany?: LineupEntryCreateManyArtistInputEnvelope
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
  }

  export type LineupEntryUpdateManyWithoutArtistNestedInput = {
    create?: XOR<LineupEntryCreateWithoutArtistInput, LineupEntryUncheckedCreateWithoutArtistInput> | LineupEntryCreateWithoutArtistInput[] | LineupEntryUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutArtistInput | LineupEntryCreateOrConnectWithoutArtistInput[]
    upsert?: LineupEntryUpsertWithWhereUniqueWithoutArtistInput | LineupEntryUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: LineupEntryCreateManyArtistInputEnvelope
    set?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    disconnect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    delete?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    update?: LineupEntryUpdateWithWhereUniqueWithoutArtistInput | LineupEntryUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: LineupEntryUpdateManyWithWhereWithoutArtistInput | LineupEntryUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: LineupEntryScalarWhereInput | LineupEntryScalarWhereInput[]
  }

  export type LineupEntryUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: XOR<LineupEntryCreateWithoutArtistInput, LineupEntryUncheckedCreateWithoutArtistInput> | LineupEntryCreateWithoutArtistInput[] | LineupEntryUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: LineupEntryCreateOrConnectWithoutArtistInput | LineupEntryCreateOrConnectWithoutArtistInput[]
    upsert?: LineupEntryUpsertWithWhereUniqueWithoutArtistInput | LineupEntryUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: LineupEntryCreateManyArtistInputEnvelope
    set?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    disconnect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    delete?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    connect?: LineupEntryWhereUniqueInput | LineupEntryWhereUniqueInput[]
    update?: LineupEntryUpdateWithWhereUniqueWithoutArtistInput | LineupEntryUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: LineupEntryUpdateManyWithWhereWithoutArtistInput | LineupEntryUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: LineupEntryScalarWhereInput | LineupEntryScalarWhereInput[]
  }

  export type FestivalCreateNestedOneWithoutLineupsInput = {
    create?: XOR<FestivalCreateWithoutLineupsInput, FestivalUncheckedCreateWithoutLineupsInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutLineupsInput
    connect?: FestivalWhereUniqueInput
  }

  export type ArtistCreateNestedOneWithoutLineupsInput = {
    create?: XOR<ArtistCreateWithoutLineupsInput, ArtistUncheckedCreateWithoutLineupsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutLineupsInput
    connect?: ArtistWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FestivalUpdateOneRequiredWithoutLineupsNestedInput = {
    create?: XOR<FestivalCreateWithoutLineupsInput, FestivalUncheckedCreateWithoutLineupsInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutLineupsInput
    upsert?: FestivalUpsertWithoutLineupsInput
    connect?: FestivalWhereUniqueInput
    update?: XOR<XOR<FestivalUpdateToOneWithWhereWithoutLineupsInput, FestivalUpdateWithoutLineupsInput>, FestivalUncheckedUpdateWithoutLineupsInput>
  }

  export type ArtistUpdateOneRequiredWithoutLineupsNestedInput = {
    create?: XOR<ArtistCreateWithoutLineupsInput, ArtistUncheckedCreateWithoutLineupsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutLineupsInput
    upsert?: ArtistUpsertWithoutLineupsInput
    connect?: ArtistWhereUniqueInput
    update?: XOR<XOR<ArtistUpdateToOneWithWhereWithoutLineupsInput, ArtistUpdateWithoutLineupsInput>, ArtistUncheckedUpdateWithoutLineupsInput>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedEnumRegionFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel>
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    not?: NestedEnumRegionFilter<$PrismaModel> | $Enums.Region
  }

  export type NestedEnumRegionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel>
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel>
    not?: NestedEnumRegionWithAggregatesFilter<$PrismaModel> | $Enums.Region
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegionFilter<$PrismaModel>
    _max?: NestedEnumRegionFilter<$PrismaModel>
  }

  export type NestedEnumFestivalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FestivalStatus | EnumFestivalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFestivalStatusFilter<$PrismaModel> | $Enums.FestivalStatus
  }

  export type NestedEnumRegionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegionNullableFilter<$PrismaModel> | $Enums.Region | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedEnumFestivalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FestivalStatus | EnumFestivalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FestivalStatus[] | ListEnumFestivalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFestivalStatusWithAggregatesFilter<$PrismaModel> | $Enums.FestivalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFestivalStatusFilter<$PrismaModel>
    _max?: NestedEnumFestivalStatusFilter<$PrismaModel>
  }

  export type NestedEnumRegionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Region | EnumRegionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Region[] | ListEnumRegionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRegionNullableWithAggregatesFilter<$PrismaModel> | $Enums.Region | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRegionNullableFilter<$PrismaModel>
    _max?: NestedEnumRegionNullableFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type FestivalCreateWithoutSubmittedByInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoter?: PromoterCreateNestedOneWithoutFestivalsInput
    lineups?: LineupEntryCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutSubmittedByInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    promoterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineups?: LineupEntryUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutSubmittedByInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutSubmittedByInput, FestivalUncheckedCreateWithoutSubmittedByInput>
  }

  export type FestivalCreateManySubmittedByInputEnvelope = {
    data: FestivalCreateManySubmittedByInput | FestivalCreateManySubmittedByInput[]
    skipDuplicates?: boolean
  }

  export type FestivalUpsertWithWhereUniqueWithoutSubmittedByInput = {
    where: FestivalWhereUniqueInput
    update: XOR<FestivalUpdateWithoutSubmittedByInput, FestivalUncheckedUpdateWithoutSubmittedByInput>
    create: XOR<FestivalCreateWithoutSubmittedByInput, FestivalUncheckedCreateWithoutSubmittedByInput>
  }

  export type FestivalUpdateWithWhereUniqueWithoutSubmittedByInput = {
    where: FestivalWhereUniqueInput
    data: XOR<FestivalUpdateWithoutSubmittedByInput, FestivalUncheckedUpdateWithoutSubmittedByInput>
  }

  export type FestivalUpdateManyWithWhereWithoutSubmittedByInput = {
    where: FestivalScalarWhereInput
    data: XOR<FestivalUpdateManyMutationInput, FestivalUncheckedUpdateManyWithoutSubmittedByInput>
  }

  export type FestivalScalarWhereInput = {
    AND?: FestivalScalarWhereInput | FestivalScalarWhereInput[]
    OR?: FestivalScalarWhereInput[]
    NOT?: FestivalScalarWhereInput | FestivalScalarWhereInput[]
    id?: StringFilter<"Festival"> | string
    name?: StringFilter<"Festival"> | string
    slug?: StringFilter<"Festival"> | string
    status?: EnumFestivalStatusFilter<"Festival"> | $Enums.FestivalStatus
    region?: EnumRegionNullableFilter<"Festival"> | $Enums.Region | null
    location?: StringNullableFilter<"Festival"> | string | null
    genre?: StringNullableFilter<"Festival"> | string | null
    costText?: StringNullableFilter<"Festival"> | string | null
    dateText?: StringNullableFilter<"Festival"> | string | null
    startDate?: DateTimeNullableFilter<"Festival"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Festival"> | Date | string | null
    notes?: StringNullableFilter<"Festival"> | string | null
    website?: StringNullableFilter<"Festival"> | string | null
    approved?: BoolFilter<"Festival"> | boolean
    vibe?: StringNullableFilter<"Festival"> | string | null
    camping?: BoolNullableFilter<"Festival"> | boolean | null
    ticketPrice?: StringNullableFilter<"Festival"> | string | null
    ticketUrl?: StringNullableFilter<"Festival"> | string | null
    latitude?: FloatNullableFilter<"Festival"> | number | null
    longitude?: FloatNullableFilter<"Festival"> | number | null
    promoterId?: StringNullableFilter<"Festival"> | string | null
    submittedById?: StringNullableFilter<"Festival"> | string | null
    createdAt?: DateTimeFilter<"Festival"> | Date | string
    updatedAt?: DateTimeFilter<"Festival"> | Date | string
  }

  export type FestivalCreateWithoutPromoterInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutFestivalsInput
    lineups?: LineupEntryCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutPromoterInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    submittedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineups?: LineupEntryUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutPromoterInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutPromoterInput, FestivalUncheckedCreateWithoutPromoterInput>
  }

  export type FestivalCreateManyPromoterInputEnvelope = {
    data: FestivalCreateManyPromoterInput | FestivalCreateManyPromoterInput[]
    skipDuplicates?: boolean
  }

  export type FestivalUpsertWithWhereUniqueWithoutPromoterInput = {
    where: FestivalWhereUniqueInput
    update: XOR<FestivalUpdateWithoutPromoterInput, FestivalUncheckedUpdateWithoutPromoterInput>
    create: XOR<FestivalCreateWithoutPromoterInput, FestivalUncheckedCreateWithoutPromoterInput>
  }

  export type FestivalUpdateWithWhereUniqueWithoutPromoterInput = {
    where: FestivalWhereUniqueInput
    data: XOR<FestivalUpdateWithoutPromoterInput, FestivalUncheckedUpdateWithoutPromoterInput>
  }

  export type FestivalUpdateManyWithWhereWithoutPromoterInput = {
    where: FestivalScalarWhereInput
    data: XOR<FestivalUpdateManyMutationInput, FestivalUncheckedUpdateManyWithoutPromoterInput>
  }

  export type PromoterCreateWithoutFestivalsInput = {
    id?: string
    name: string
    slug: string
    region?: string | null
    genreFocus?: string | null
    instagram?: string | null
    facebook?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromoterUncheckedCreateWithoutFestivalsInput = {
    id?: string
    name: string
    slug: string
    region?: string | null
    genreFocus?: string | null
    instagram?: string | null
    facebook?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromoterCreateOrConnectWithoutFestivalsInput = {
    where: PromoterWhereUniqueInput
    create: XOR<PromoterCreateWithoutFestivalsInput, PromoterUncheckedCreateWithoutFestivalsInput>
  }

  export type UserCreateWithoutFestivalsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    googleUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFestivalsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    googleUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFestivalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFestivalsInput, UserUncheckedCreateWithoutFestivalsInput>
  }

  export type LineupEntryCreateWithoutFestivalInput = {
    id?: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
    artist: ArtistCreateNestedOneWithoutLineupsInput
  }

  export type LineupEntryUncheckedCreateWithoutFestivalInput = {
    id?: string
    artistId: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
  }

  export type LineupEntryCreateOrConnectWithoutFestivalInput = {
    where: LineupEntryWhereUniqueInput
    create: XOR<LineupEntryCreateWithoutFestivalInput, LineupEntryUncheckedCreateWithoutFestivalInput>
  }

  export type LineupEntryCreateManyFestivalInputEnvelope = {
    data: LineupEntryCreateManyFestivalInput | LineupEntryCreateManyFestivalInput[]
    skipDuplicates?: boolean
  }

  export type PromoterUpsertWithoutFestivalsInput = {
    update: XOR<PromoterUpdateWithoutFestivalsInput, PromoterUncheckedUpdateWithoutFestivalsInput>
    create: XOR<PromoterCreateWithoutFestivalsInput, PromoterUncheckedCreateWithoutFestivalsInput>
    where?: PromoterWhereInput
  }

  export type PromoterUpdateToOneWithWhereWithoutFestivalsInput = {
    where?: PromoterWhereInput
    data: XOR<PromoterUpdateWithoutFestivalsInput, PromoterUncheckedUpdateWithoutFestivalsInput>
  }

  export type PromoterUpdateWithoutFestivalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genreFocus?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoterUncheckedUpdateWithoutFestivalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genreFocus?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutFestivalsInput = {
    update: XOR<UserUpdateWithoutFestivalsInput, UserUncheckedUpdateWithoutFestivalsInput>
    create: XOR<UserCreateWithoutFestivalsInput, UserUncheckedCreateWithoutFestivalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFestivalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFestivalsInput, UserUncheckedUpdateWithoutFestivalsInput>
  }

  export type UserUpdateWithoutFestivalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    googleUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFestivalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    googleUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryUpsertWithWhereUniqueWithoutFestivalInput = {
    where: LineupEntryWhereUniqueInput
    update: XOR<LineupEntryUpdateWithoutFestivalInput, LineupEntryUncheckedUpdateWithoutFestivalInput>
    create: XOR<LineupEntryCreateWithoutFestivalInput, LineupEntryUncheckedCreateWithoutFestivalInput>
  }

  export type LineupEntryUpdateWithWhereUniqueWithoutFestivalInput = {
    where: LineupEntryWhereUniqueInput
    data: XOR<LineupEntryUpdateWithoutFestivalInput, LineupEntryUncheckedUpdateWithoutFestivalInput>
  }

  export type LineupEntryUpdateManyWithWhereWithoutFestivalInput = {
    where: LineupEntryScalarWhereInput
    data: XOR<LineupEntryUpdateManyMutationInput, LineupEntryUncheckedUpdateManyWithoutFestivalInput>
  }

  export type LineupEntryScalarWhereInput = {
    AND?: LineupEntryScalarWhereInput | LineupEntryScalarWhereInput[]
    OR?: LineupEntryScalarWhereInput[]
    NOT?: LineupEntryScalarWhereInput | LineupEntryScalarWhereInput[]
    id?: StringFilter<"LineupEntry"> | string
    festivalId?: StringFilter<"LineupEntry"> | string
    artistId?: StringFilter<"LineupEntry"> | string
    year?: IntFilter<"LineupEntry"> | number
    isHeadliner?: BoolFilter<"LineupEntry"> | boolean
    source?: StringNullableFilter<"LineupEntry"> | string | null
    createdAt?: DateTimeFilter<"LineupEntry"> | Date | string
  }

  export type LineupEntryCreateWithoutArtistInput = {
    id?: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
    festival: FestivalCreateNestedOneWithoutLineupsInput
  }

  export type LineupEntryUncheckedCreateWithoutArtistInput = {
    id?: string
    festivalId: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
  }

  export type LineupEntryCreateOrConnectWithoutArtistInput = {
    where: LineupEntryWhereUniqueInput
    create: XOR<LineupEntryCreateWithoutArtistInput, LineupEntryUncheckedCreateWithoutArtistInput>
  }

  export type LineupEntryCreateManyArtistInputEnvelope = {
    data: LineupEntryCreateManyArtistInput | LineupEntryCreateManyArtistInput[]
    skipDuplicates?: boolean
  }

  export type LineupEntryUpsertWithWhereUniqueWithoutArtistInput = {
    where: LineupEntryWhereUniqueInput
    update: XOR<LineupEntryUpdateWithoutArtistInput, LineupEntryUncheckedUpdateWithoutArtistInput>
    create: XOR<LineupEntryCreateWithoutArtistInput, LineupEntryUncheckedCreateWithoutArtistInput>
  }

  export type LineupEntryUpdateWithWhereUniqueWithoutArtistInput = {
    where: LineupEntryWhereUniqueInput
    data: XOR<LineupEntryUpdateWithoutArtistInput, LineupEntryUncheckedUpdateWithoutArtistInput>
  }

  export type LineupEntryUpdateManyWithWhereWithoutArtistInput = {
    where: LineupEntryScalarWhereInput
    data: XOR<LineupEntryUpdateManyMutationInput, LineupEntryUncheckedUpdateManyWithoutArtistInput>
  }

  export type FestivalCreateWithoutLineupsInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoter?: PromoterCreateNestedOneWithoutFestivalsInput
    submittedBy?: UserCreateNestedOneWithoutFestivalsInput
  }

  export type FestivalUncheckedCreateWithoutLineupsInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    promoterId?: string | null
    submittedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FestivalCreateOrConnectWithoutLineupsInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutLineupsInput, FestivalUncheckedCreateWithoutLineupsInput>
  }

  export type ArtistCreateWithoutLineupsInput = {
    id?: string
    name: string
    slug: string
    genre?: string | null
    homeCity?: string | null
    crew?: string | null
    instagram?: string | null
    soundcloud?: string | null
    raUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtistUncheckedCreateWithoutLineupsInput = {
    id?: string
    name: string
    slug: string
    genre?: string | null
    homeCity?: string | null
    crew?: string | null
    instagram?: string | null
    soundcloud?: string | null
    raUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtistCreateOrConnectWithoutLineupsInput = {
    where: ArtistWhereUniqueInput
    create: XOR<ArtistCreateWithoutLineupsInput, ArtistUncheckedCreateWithoutLineupsInput>
  }

  export type FestivalUpsertWithoutLineupsInput = {
    update: XOR<FestivalUpdateWithoutLineupsInput, FestivalUncheckedUpdateWithoutLineupsInput>
    create: XOR<FestivalCreateWithoutLineupsInput, FestivalUncheckedCreateWithoutLineupsInput>
    where?: FestivalWhereInput
  }

  export type FestivalUpdateToOneWithWhereWithoutLineupsInput = {
    where?: FestivalWhereInput
    data: XOR<FestivalUpdateWithoutLineupsInput, FestivalUncheckedUpdateWithoutLineupsInput>
  }

  export type FestivalUpdateWithoutLineupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoter?: PromoterUpdateOneWithoutFestivalsNestedInput
    submittedBy?: UserUpdateOneWithoutFestivalsNestedInput
  }

  export type FestivalUncheckedUpdateWithoutLineupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    promoterId?: NullableStringFieldUpdateOperationsInput | string | null
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtistUpsertWithoutLineupsInput = {
    update: XOR<ArtistUpdateWithoutLineupsInput, ArtistUncheckedUpdateWithoutLineupsInput>
    create: XOR<ArtistCreateWithoutLineupsInput, ArtistUncheckedCreateWithoutLineupsInput>
    where?: ArtistWhereInput
  }

  export type ArtistUpdateToOneWithWhereWithoutLineupsInput = {
    where?: ArtistWhereInput
    data: XOR<ArtistUpdateWithoutLineupsInput, ArtistUncheckedUpdateWithoutLineupsInput>
  }

  export type ArtistUpdateWithoutLineupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    homeCity?: NullableStringFieldUpdateOperationsInput | string | null
    crew?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    soundcloud?: NullableStringFieldUpdateOperationsInput | string | null
    raUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtistUncheckedUpdateWithoutLineupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    homeCity?: NullableStringFieldUpdateOperationsInput | string | null
    crew?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    soundcloud?: NullableStringFieldUpdateOperationsInput | string | null
    raUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalCreateManySubmittedByInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    promoterId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FestivalUpdateWithoutSubmittedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoter?: PromoterUpdateOneWithoutFestivalsNestedInput
    lineups?: LineupEntryUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutSubmittedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    promoterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineups?: LineupEntryUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateManyWithoutSubmittedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    promoterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalCreateManyPromoterInput = {
    id?: string
    name: string
    slug: string
    status?: $Enums.FestivalStatus
    region?: $Enums.Region | null
    location?: string | null
    genre?: string | null
    costText?: string | null
    dateText?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    notes?: string | null
    website?: string | null
    approved?: boolean
    vibe?: string | null
    camping?: boolean | null
    ticketPrice?: string | null
    ticketUrl?: string | null
    latitude?: number | null
    longitude?: number | null
    submittedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FestivalUpdateWithoutPromoterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutFestivalsNestedInput
    lineups?: LineupEntryUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutPromoterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineups?: LineupEntryUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateManyWithoutPromoterInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumFestivalStatusFieldUpdateOperationsInput | $Enums.FestivalStatus
    region?: NullableEnumRegionFieldUpdateOperationsInput | $Enums.Region | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    costText?: NullableStringFieldUpdateOperationsInput | string | null
    dateText?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    approved?: BoolFieldUpdateOperationsInput | boolean
    vibe?: NullableStringFieldUpdateOperationsInput | string | null
    camping?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ticketPrice?: NullableStringFieldUpdateOperationsInput | string | null
    ticketUrl?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryCreateManyFestivalInput = {
    id?: string
    artistId: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
  }

  export type LineupEntryUpdateWithoutFestivalInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artist?: ArtistUpdateOneRequiredWithoutLineupsNestedInput
  }

  export type LineupEntryUncheckedUpdateWithoutFestivalInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryUncheckedUpdateManyWithoutFestivalInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryCreateManyArtistInput = {
    id?: string
    festivalId: string
    year: number
    isHeadliner?: boolean
    source?: string | null
    createdAt?: Date | string
  }

  export type LineupEntryUpdateWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutLineupsNestedInput
  }

  export type LineupEntryUncheckedUpdateWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    festivalId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LineupEntryUncheckedUpdateManyWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    festivalId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    isHeadliner?: BoolFieldUpdateOperationsInput | boolean
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
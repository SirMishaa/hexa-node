type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
type LogLevelWithSilent = LogLevel | 'silent'
interface LogFunction {
	// TODO: why is this different from `obj: object` or `obj: any`?
	<T extends object>(object: T, message?: string, ...arguments_: never[]): void
	(object: unknown, message?: string, ...arguments_: never[]): void
	(message: string, ...arguments_: never[]): void
}
export interface BaseLoggerInterface {
	/**
	 * Set this property to the desired logging level. In order of priority, available levels are:
	 *
	 * - 'fatal'
	 * - 'error'
	 * - 'warn'
	 * - 'info'
	 * - 'debug'
	 * - 'trace'
	 *
	 * The logging level is a __minimum__ level. For instance if `logger.level` is `'info'` then all `'fatal'`, `'error'`, `'warn'`,
	 * and `'info'` logs will be enabled.
	 *
	 * You can pass `'silent'` to disable logging.
	 */
	level: LogLevelWithSilent | string

	/**
	 * Log at `'fatal'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
	 * If more args follows `msg`, these will be used to format `msg` using `util.format`.
	 *
	 * @typeParam T: the interface of the object being serialized. Default is object.
	 * @param obj: object to be serialized
	 * @param msg: the log message to write
	 * @param ...args: format string values when `msg` is a format string
	 */
	fatal: LogFunction
	/**
	 * Log at `'error'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
	 * If more args follows `msg`, these will be used to format `msg` using `util.format`.
	 *
	 * @typeParam T: the interface of the object being serialized. Default is object.
	 * @param obj: object to be serialized
	 * @param msg: the log message to write
	 * @param ...args: format string values when `msg` is a format string
	 */
	error: LogFunction
	/**
	 * Log at `'warn'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
	 * If more args follows `msg`, these will be used to format `msg` using `util.format`.
	 *
	 * @typeParam T: the interface of the object being serialized. Default is object.
	 * @param obj: object to be serialized
	 * @param msg: the log message to write
	 * @param ...args: format string values when `msg` is a format string
	 */
	warn: LogFunction
	/**
	 * Log at `'info'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
	 * If more args follows `msg`, these will be used to format `msg` using `util.format`.
	 *
	 * @typeParam T: the interface of the object being serialized. Default is object.
	 * @param obj: object to be serialized
	 * @param msg: the log message to write
	 * @param ...args: format string values when `msg` is a format string
	 */
	info: LogFunction
	/**
	 * Log at `'debug'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
	 * If more args follows `msg`, these will be used to format `msg` using `util.format`.
	 *
	 * @typeParam T: the interface of the object being serialized. Default is object.
	 * @param obj: object to be serialized
	 * @param msg: the log message to write
	 * @param ...args: format string values when `msg` is a format string
	 */
	debug: LogFunction
	/**
	 * Log at `'trace'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
	 * If more args follows `msg`, these will be used to format `msg` using `util.format`.
	 *
	 * @typeParam T: the interface of the object being serialized. Default is object.
	 * @param obj: object to be serialized
	 * @param msg: the log message to write
	 * @param ...args: format string values when `msg` is a format string
	 */
	trace: LogFunction
	/**
	 * Noop function.
	 */
	silent: LogFunction
}

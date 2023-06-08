import { BaseCommand, args } from '@adonisjs/core/build/standalone'
import path from 'path'

export default class MakeService extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:service'

  @args.string({ description: 'Name of the service', required: true })
  public name: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Make a new service inside the app/Services directory'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    this.generator
      .addFile(this.name, { extname: '.ts', pattern: 'pascalcase', suffix: 'Service' })
      .appRoot(this.application.appRoot)
      .destinationDir('app/Services')
      .useMustache()
      .stub(path.join(__dirname, './templates/service.txt'))
      .apply({})

    await this.generator.run()
  }
}

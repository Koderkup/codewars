//fabric method add services
import { ConfigService, ConfigType } from '@nestjs/config';
import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => ({
  stripe: {
    apiKey: process.env.STRIPE_SECRET_KEY,
  },
  payPal: {
    apiKey: 'str',
  },
}));
@Module({
  providers: [
    ...Object.values(payments),
    {
      provide: STRIPE_CLIENT, //may be string
      useFactory: (configService: ConfigService) => {
        const config: ConfigType<typeof paymentConfig> =
          configService.get('payment');
        return new Stripe(config.stripe.apiKey);
      },
      inject: [ConfigService],
    },
    PaymentReactService,
    ProductItemService,
    ProductItemRepository,
    PrismaService,
    SessionService,
  ]



  //fabric 
  function getPaymentBySign(paymentName: string) {
    const actionClass = Object.values(payments).find(
      (p) => p.SIGNATURE === paymentName,
    );
    if (!actionClass) {
      throw new Error(`Payment  not found`);
    }
    return this.ref.get(actionClass);
  }

//   SIGNATURE in class 
// public static readonly SIGNATURE = Payments.CARD;


//read and send file

// @Get('.well-known/apple-developer-merchantid-domain-association')
  // async sendFile(@Res() res: Response) {
  //   const filePath = join(
  //     process.cwd(),
  //     'public',
  //     '.well-known',
  //     'apple-developer-merchantid-domain-association',
  //   );
  //   console.log('File path:', filePath);
  //   try {
  //     await fs.access(filePath);
  //     return res.sendFile(filePath);
  //   } catch (error) {
  //     return res.status(404).json({ message: 'File not found' });
  //   }
  // }


  app.use(
    bodyParser.json({
      verify: (req: any, res, buf: Buffer) => {
        if (req.headers['stripe-signature']) {
          req.rawBody = buf.toString();
        }
      },
    }),
  );
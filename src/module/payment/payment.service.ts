import { Injectable } from '@nestjs/common';
// import * as paypal from '@paypal/checkout-server-sdk';

// TODO
@Injectable()
export class PaymentService {
  getAll(): string {
    // // Creating an environment
    // const clientId = '<<PAYPAL-CLIENT-ID>>';
    // const clientSecret = '<<PAYPAL-CLIENT-SECRET>>';
    // // This sample uses SandboxEnvironment. In production, use LiveEnvironment
    // const environment = new paypal.core.SandboxEnvironment(
    //   clientId,
    //   clientSecret,
    // );
    // const client = new paypal.core.PayPalHttpClient(environment);

    // // Construct a request object and set desired parameters
    // // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    // const request = new paypal.orders.OrdersCreateRequest();
    // request.requestBody({
    //   intent: 'CAPTURE',
    //   purchase_units: [
    //     {
    //       amount: {
    //         currency_code: 'USD',
    //         value: '100.00',
    //       },
    //     },
    //   ],
    // });

    // // Call API with your client and get a response for your call
    // const createOrder = async function () {
    //   const response = await client.execute(request);
    //   console.log(`Response: ${JSON.stringify(response)}`);
    //   // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    //   console.log(`Order: ${JSON.stringify(response.result)}`);
    // };
    // console.log('=>', createOrder());
    return 'test';
  }
}

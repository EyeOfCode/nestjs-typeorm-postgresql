import { PaymentService } from './payment.service';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => String)
  async getTestPay(): Promise<string> {
    return this.paymentService.getAll();
  }
}

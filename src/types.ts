import { SampleObject } from "./sample-durable"

export type Env = {
    Bindings: {
        DO_D1_DB: D1Database
        DO_D1_DO: DurableObjectNamespace<SampleObject>
    },
    Variables: {
        stub: DurableObjectStub<SampleObject>
    }
}
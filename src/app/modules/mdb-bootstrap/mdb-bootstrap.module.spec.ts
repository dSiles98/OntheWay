import { MdbBootstrapModule } from './mdb-bootstrap.module';

describe('MdbBootstrapModule', () => {
  let mdbBootstrapModule: MdbBootstrapModule;

  beforeEach(() => {
    mdbBootstrapModule = new MdbBootstrapModule();
  });

  it('should create an instance', () => {
    expect(mdbBootstrapModule).toBeTruthy();
  });
});

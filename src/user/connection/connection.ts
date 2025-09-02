import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string | null {
    return null;
  }
}

@Injectable()
export class mySQLConnection extends Connection {
  getName(): string {
    return 'MySQL';
  }
}

@Injectable()
export class mongoDBConnection extends Connection {
  getName(): string {
    return 'MongoDB';
  }
}

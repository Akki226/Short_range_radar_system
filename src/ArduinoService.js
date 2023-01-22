import { SerialPort } from 'serialport';
import { Readline } from '@serialport/parser-readline';


export class ArduinoService {
  constructor() {
    this.serial = new SerialPort("COM3", { baudRate: 9600 });
    this.parser = new Readline();
    this.serial.pipe(this.parser);
  }

  connect() {
    this.serial.on("open", () => {
      console.log("Serial Port is open");
    });
    this.parser.on("data", (data) => {
      this.data = {
        distance: parseInt(data.substring(0, 4)),
        angle: parseInt(data.substring(4))
      };
    });
  }

  disconnect() {
    this.serial.close();
  }

  getData() {
    return this.data;
  }
}
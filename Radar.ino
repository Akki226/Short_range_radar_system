#include <Servo.h>
#include <NewPing.h>

#define TRIGGER_PIN 12
#define ECHO_PIN 11
#define MAX_DISTANCE 200
#define SERVO_PIN 9

Servo servo;
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

void setup() {
  Serial.begin(9600);
  servo.attach(SERVO_PIN);
}

void loop() {
  for (int angle = 0; angle <= 180; angle++) {
    servo.write(angle);
    delay(15);
    int distance = sonar.ping_cm();
    sendData(distance, angle);
  }
  for (int angle = 180; angle >= 0; angle--) {
    servo.write(angle);
    delay(15);
    int distance = sonar.ping_cm();
    sendData(distance, angle);
  }
}

void sendData(int distance, int angle) {
  String data = String(distance) + String(angle);
  Serial.println(data);
}
void setup() {
  Serial.begin(115200);
}

void loop() {
  int Signal = analogRead(A0);
  Serial.println(Signal);
  delay(500);
}
#define TRIG_PIN D1
#define ECHO_PIN D0

void initDistance()
{
    pinMode(ECHO_PIN, INPUT);
    pinMode(TRIG_PIN, OUTPUT);
}

float readDistance()
{
    Serial.println("Reading distance...");

    // Clears the TRIG_PIN
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);

    // Sets the TRIG_PIN on HIGH state for 10 micro seconds
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    // Reads the echoPin, returns the sound wave travel time in microseconds
    long duration = pulseIn(ECHO_PIN, HIGH);

    Serial.printlnf("Duration: %ldus", duration);

    // Calculating the distance
    float distance = duration * 0.34 / 2;

    Serial.printlnf("Distance: %.0fmm", distance);

    return distance;
}

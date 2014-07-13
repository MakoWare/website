package com.makowaredev.website;

public class Ball {

    public Ball(int type, float x, float y) {

	  BodyDef bodyDef = new BodyDef();
	  bodyDef.type = BodyType.DynamicBody;
	  bodyDef.position.set(camera.viewportWidth / 2, camera.viewportHeight / 2);
	  Body body = world.createBody(bodyDef);
	  CircleShape dynamicCircle = new CircleShape();
	  dynamicCircle.setRadius(5f);
	  FixtureDef fixtureDef = new FixtureDef();
	  fixtureDef.shape = dynamicCircle;
	  fixtureDef.density = 1.0f;
	  fixtureDef.friction = 0.0f;
	  fixtureDef.restitution = 1;
	  body.createFixture(fixtureDef);


    }

    public void update (float deltaTime) {
        if (type == PLATFORM_TYPE_MOVING) {
            position.add(velocity.x * deltaTime, 0);
            bounds.x = position.x - PLATFORM_WIDTH / 2;
            bounds.y = position.y - PLATFORM_HEIGHT / 2;

            if (position.x < PLATFORM_WIDTH / 2) {
                velocity.x = -velocity.x;
                position.x = PLATFORM_WIDTH / 2;
            }
            if (position.x > World.WORLD_WIDTH - PLATFORM_WIDTH / 2) {
                velocity.x = -velocity.x;
                position.x = World.WORLD_WIDTH - PLATFORM_WIDTH / 2;
            }
        }

        stateTime += deltaTime;
    }

    public void pulverize () {
        state = PLATFORM_STATE_PULVERIZING;
        stateTime = 0;
        velocity.x = 0;
    }
}
